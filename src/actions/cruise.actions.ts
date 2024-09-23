"use server";

import { auth } from "@/auth";
import { sql } from "@/database";
import { getShipByName } from "@/server/cruises.server";
import { getErrorMessage } from "@/utils/error-message";
import { revalidatePath } from "next/cache";

import cloudinary from "@/lib/cloudinary";
import { CruiseItineraryType } from "@/zod/types/cruises.type";
import { cruiseItinerarySchema } from "@/zod/schemas/cruise.schema";

export const addShipAction = async (data: FormData) => {
  try {
    const session = await auth();

    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    if (session?.user?.role !== "admin" && session?.user?.role !== "manager") {
      return {
        error: "Unauthorized",
      };
    }

    const ship_name = data.get("ship_name") as string;
    const ship_class = data.get("ship_class") as string;
    const ship_image = data.get("ship_image") as File;

    if (ship_image.size > 3000000) {
      return {
        error: "File size exceeds 3mb",
      };
    }

    const arrayBuffer = await ship_image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Delete existing images in the folder
    await cloudinary.api.delete_resources_by_prefix(`msc/${ship_name}`);

    // Upload the new image
    const upload = new Promise(async (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            folder: `msc/${ship_name}`,
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
        `INSERT INTO ships (ship_name, ship_image, ship_class) VALUES ($1, $2, $3) RETURNING *`,
        [ship_name, imageUrl, ship_class]
      );
    }

    revalidatePath("/dashboard/admin/cruises-admin/ships");

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

    if (session?.user?.role !== "admin" && session?.user?.role !== "manager") {
      return {
        error: "Unauthorized",
      };
    }

    const shipId = parseInt(id);
    const ship_name = data.get("ship_name") as string;
    const ship_class = data.get("ship_class") as string;
    const ship_image = data.get("ship_image") as File;

    if (!shipId) {
      return {
        error: "Ship ID is required",
      };
    }

    if (!ship_name) {
      return {
        error: "Name is required",
      };
    }

    if (!ship_class) {
      return {
        error: "Type is required",
      };
    }

    if (!ship_image) {
      return {
        error: "Image is required",
      };
    }

    if (ship_image.size > 3000000) {
      return {
        error: "File size exceeds 3mb",
      };
    }

    const arrayBuffer = await ship_image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Delete existing images in the folder
    await cloudinary.api.delete_resources_by_prefix(`msc/${ship_name}`);

    // Upload the new image
    const upload = new Promise(async (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            folder: `msc/${ship_name}`,
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
        `UPDATE ships SET ship_name = $1, ship_image = $2, type = $3 WHERE ship_id = $4`,
        [ship_name, imageUrl, ship_class, shipId]
      );
    }

    revalidatePath("/dashboard/admin/cruises-admin/ships");

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

export const deleteShipAction = async (id: string) => {
  try {
    const session = await auth();

    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    if (session?.user?.role !== "admin" && session?.user?.role !== "manager") {
      return {
        error: "Unauthorized",
      };
    }

    const shipId = parseInt(id);

    if (!shipId) {
      return {
        error: "Ship ID is required",
      };
    }

    await sql.query("DELETE FROM ships WHERE ship_id = $1", [shipId]);

    revalidatePath("/dashboard/admin/cruises-admin/ships");

    return {
      success: "Ship deleted successfully",
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

    if (session?.user?.role !== "admin" && session?.user?.role !== "manager") {
      return {
        error: "Unauthorized",
      };
    }

    const cabin_name = data.get("cabin_name") as string;
    const ship = data.get("ship_id") as string;
    const cabin_image = data.get("cabin_image") as File;

    if (!cabin_image) {
      return {
        error: "Image is required",
      };
    }

    if (!cabin_name) {
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

    if (cabin_image.size > 3000000) {
      return {
        error: "File size exceeds 3mb",
      };
    }

    const arrayBuffer = await cabin_image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Delete existing images in the folder
    await cloudinary.api.delete_resources_by_prefix(
      `msc/${ship}/${cabin_name}`
    );

    // Upload the new image
    const upload = new Promise(async (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            folder: `msc/${ship}/${cabin_name}`,
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
        `INSERT INTO cabins (cabin_name, cabin_image, ship_id) VALUES ($1, $2, $3) RETURNING *`,
        [cabin_name, imageUrl, ship_id]
      );
    }

    revalidatePath("/dashboard/admin/cruises-admin/cabins");

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

    if (session?.user?.role !== "admin" && session?.user?.role !== "manager") {
      return {
        error: "Unauthorized",
      };
    }

    const cabinId = parseInt(id);
    const cabin_name = data.get("cabin_name") as string;
    const ship = data.get("ship_id") as string;
    const cabin_image = data.get("cabin_image") as File;

    if (!cabinId) {
      return {
        error: "Cabin ID is required",
      };
    }

    if (!cabin_image) {
      return {
        error: "Image is required",
      };
    }

    if (!cabin_name) {
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

    if (cabin_image.size > 3000000) {
      return {
        error: "File size exceeds 3mb",
      };
    }

    const arrayBuffer = await cabin_image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Delete existing images in the folder
    await cloudinary.api.delete_resources_by_prefix(
      `msc/${ship}/${cabin_name}`
    );

    // Upload the new image
    const upload = new Promise(async (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            folder: `msc/${ship}/${cabin_name}`,
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
        `UPDATE cabins SET cabin_name = $1, cabin_image = $2, ship_id = $3 WHERE cabin_id = $4 RETURNING *`,
        [cabin_name, imageUrl, ship_id, cabinId]
      );
    }

    revalidatePath("/dashboard/admin/cruises-admin/cabins");

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

export const deleteCabinAction = async (id: string) => {
  try {
    const session = await auth();

    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    if (session?.user?.role !== "admin" && session?.user?.role !== "manager") {
      return {
        error: "Unauthorized",
      };
    }

    const cabinId = parseInt(id);
    if (!cabinId) {
      return {
        error: "Cabin ID is required",
      };
    }

    await sql.query("DELETE FROM cabins WHERE cabin_id = $1", [cabinId]);

    revalidatePath("/dashboard/admin/cruises-admin/cabins");

    return {
      success: "Cabin deleted successfully",
    };
  } catch (error) {
    console.error({ cabinError: error });
    return {
      error: getErrorMessage(error),
    };
  }
};

export const addCruiseItineraryAction = async (data: CruiseItineraryType) => {
  try {
    const session = await auth();

    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    if (session?.user?.role !== "admin" && session?.user?.role !== "manager") {
      return {
        error: "Unauthorized",
      };
    }

    const results = cruiseItinerarySchema.safeParse(data);

    if (!results.success) {
      return {
        error: results.error.errors[0].message,
      };
    }

    const { cruise_id, day, location, arrive, depart } = results.data;

    await sql.query(
      `INSERT INTO cruise_itinerary (cruise_id, day, location, arrive, depart) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [cruise_id, day, location, arrive, depart]
    );

    revalidatePath("/dashboard/admin/cruises-admin/cabins");

    return {
      success: "Cruise itinerary added successfully",
    };
  } catch (error) {
    console.error({ cabinError: error });
    return {
      error: getErrorMessage(error),
    };
  }
};

export const updateCruiseItineraryAction = async (
  data: CruiseItineraryType,
  id: string
) => {
  try {
    const session = await auth();

    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    if (session?.user?.role !== "admin" && session?.user?.role !== "manager") {
      return {
        error: "Unauthorized",
      };
    }

    const results = cruiseItinerarySchema.safeParse(data);

    if (!results.success) {
      return {
        error: results.error.errors[0].message,
      };
    }

    const cruiseItineraryId = parseInt(id);

    if (!cruiseItineraryId) {
      return {
        error: "Cruise Itinerary ID is required",
      };
    }

    const { cruise_id, day, location, arrive, depart } = results.data;

    await sql.query(
      "UPDATE cruise_itinerary SET cruise_id = $1, day = $2, location = $3, arrive = $4, depart = $5 WHERE cruise_itinerary_id = $6 RETURNING *",
      [cruise_id, day, location, arrive, depart, cruiseItineraryId]
    );

    revalidatePath("/dashboard/admin/cruises-admin/cabins");

    return {
      success: "Cruise Itinerary updated successfully",
    };
  } catch (error) {
    console.error({ cabinError: error });
    return {
      error: getErrorMessage(error),
    };
  }
};
