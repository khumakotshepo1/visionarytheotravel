"use server";

import { auth } from "@/auth";
import { sql } from "@/database";
import cloudinary from "@/lib/cloudinary";
import { getShipByName } from "@/server/ships.server";
import { getErrorMessage } from "@/utils/error-message";

export const addShipAction = async (data: FormData) => {
  try {
    const session = await auth();

    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    const name = data.get("name") as string;
    const type = data.get("type") as string;
    const image = data.get("image") as File;

    if (image.size > 3000000) {
      return {
        error: "File size exceeds 3mb",
      };
    }

    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Delete existing images in the folder
    await cloudinary.api.delete_resources_by_prefix(`msc/${name}`);

    // Upload the new image
    const upload = new Promise(async (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            folder: `msc/${name}`,
            width: 500, // Set the desired width
            height: 500, // Set the desired height
            crop: "fill", // Crop the image to fit the specified dimensions
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          async (error: any, result: any) => {
            if (error) {
              return reject(error.message);
            }
            return resolve(result?.secure_url);
          }
        )
        .end(buffer);
    });

    const imageUrl = await upload;

    if (imageUrl) {
      await sql.query(
        `INSERT INTO ships (name, image, type) VALUES ($1, $2, $3) RETURNING *`,
        [name, imageUrl, type]
      );
    }

    return {
      success: "Ship added successfully",
    };
  } catch (error) {
    console.error({ shipError: error });
    return {
      error: getErrorMessage(error),
    };
  }
};

export const updateShipAction = async (data: FormData, id: string) => {
  try {
    const session = await auth();

    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    const shipId = parseInt(id);
    const name = data.get("name") as string;
    const type = data.get("type") as string;
    const image = data.get("image") as File;

    if (!shipId) {
      return {
        error: "Ship ID is required",
      };
    }

    if (!name) {
      return {
        error: "Name is required",
      };
    }

    if (!type) {
      return {
        error: "Type is required",
      };
    }

    if (!image) {
      return {
        error: "Image is required",
      };
    }

    if (image.size > 3000000) {
      return {
        error: "File size exceeds 3mb",
      };
    }

    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Delete existing images in the folder
    await cloudinary.api.delete_resources_by_prefix(`msc/${name}`);

    // Upload the new image
    const upload = new Promise(async (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            folder: `msc/${name}`,
            width: 500, // Set the desired width
            height: 500, // Set the desired height
            crop: "fill", // Crop the image to fit the specified dimensions
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          async (error: any, result: any) => {
            if (error) {
              return reject(error.message);
            }
            return resolve(result?.secure_url);
          }
        )
        .end(buffer);
    });

    const imageUrl = await upload;

    if (imageUrl) {
      await sql.query(
        `UPDATE ships SET name = $1, image = $2, type = $3 WHERE ship_id = $4`,
        [name, imageUrl, type, shipId]
      );
    }

    return {
      success: "Ship updated successfully",
    };
  } catch (error) {
    console.error({ shipError: error });
    return {
      error: getErrorMessage(error),
    };
  }
};

export const addCabinAction = async (data: FormData) => {
  try {
    const session = await auth();

    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    const name = data.get("name") as string;
    const ship = data.get("ship_id") as string;
    const image = data.get("image") as File;

    if (!image) {
      return {
        error: "Image is required",
      };
    }

    if (!name) {
      return {
        error: "Name is required",
      };
    }

    if (!ship) {
      return {
        error: "Ship is required",
      };
    }

    const { ship_id } = await getShipByName(ship);

    if (image.size > 3000000) {
      return {
        error: "File size exceeds 3mb",
      };
    }

    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Delete existing images in the folder
    await cloudinary.api.delete_resources_by_prefix(`msc/${ship}/${name}`);

    // Upload the new image
    const upload = new Promise(async (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            folder: `msc/${ship}/${name}`,
            width: 500, // Set the desired width
            height: 500, // Set the desired height
            crop: "fill", // Crop the image to fit the specified dimensions
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          async (error: any, result: any) => {
            if (error) {
              return reject(error.message);
            }
            return resolve(result?.secure_url);
          }
        )
        .end(buffer);
    });

    const imageUrl = await upload;

    if (imageUrl) {
      await sql.query(
        `INSERT INTO cabins (name, image, ship_id) VALUES ($1, $2, $3) RETURNING *`,
        [name, imageUrl, ship_id]
      );
    }

    return {
      success: "Cabin added successfully",
    };
  } catch (error) {
    console.error({ cabinError: error });
    return {
      error: getErrorMessage(error),
    };
  }
};

export const updateCabinAction = async (data: FormData, id: string) => {
  try {
    const session = await auth();

    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    const cabinId = parseInt(id);
    const name = data.get("name") as string;
    const ship = data.get("ship_id") as string;
    const image = data.get("image") as File;

    if (!cabinId) {
      return {
        error: "Cabin ID is required",
      };
    }

    if (!image) {
      return {
        error: "Image is required",
      };
    }

    if (!name) {
      return {
        error: "Name is required",
      };
    }

    if (!ship) {
      return {
        error: "Ship is required",
      };
    }

    const { ship_id } = await getShipByName(ship);

    if (image.size > 3000000) {
      return {
        error: "File size exceeds 3mb",
      };
    }

    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Delete existing images in the folder
    await cloudinary.api.delete_resources_by_prefix(`msc/${ship}/${name}`);

    // Upload the new image
    const upload = new Promise(async (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            folder: `msc/${ship}/${name}`,
            width: 500, // Set the desired width
            height: 500, // Set the desired height
            crop: "fill", // Crop the image to fit the specified dimensions
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          async (error: any, result: any) => {
            if (error) {
              return reject(error.message);
            }
            return resolve(result?.secure_url);
          }
        )
        .end(buffer);
    });

    const imageUrl = await upload;

    if (imageUrl) {
      await sql.query(
        `UPDATE cabins SET name = $1, image = $2, ship_id = $3 WHERE cabin_id = $4 RETURNING *`,
        [name, imageUrl, ship_id, cabinId]
      );
    }

    return {
      success: "Cabin updated successfully",
    };
  } catch (error) {
    console.error({ cabinError: error });
    return {
      error: getErrorMessage(error),
    };
  }
};
