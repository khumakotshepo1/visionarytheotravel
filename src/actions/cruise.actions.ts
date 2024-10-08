"use server";

import { auth } from "@/auth";
import { sql } from "@/database";
import {
  getCruiseBookingPaymentByCruiseBookingNumber,
  getCruiseByDestionation,
  getCruiseById,
  getCruiseByName,
  getShipByName,
} from "@/server/cruises.server";
import { getErrorMessage } from "@/utils/error-message";
import { revalidatePath } from "next/cache";

import cloudinary from "@/lib/cloudinary";
import {
  CruiseBookingPaymentType,
  CruiseBookingType,
  CruiseItineraryType,
} from "@/zod/types/cruises.type";
import {
  cruiseBookingPaymentSchema,
  cruiseBookingSchema,
  cruiseItinerarySchema,
} from "@/zod/schemas/cruise.schema";
import { CustomerType } from "@/zod/types/customer.type";
import { customerSchema } from "@/zod/schemas/customer.schema";
import {
  getCruiseBookingByBookingNumber,
  getCruiseBookingByCustomerId,
  getCustomerByEmail,
  getCustomerByPhoneNumber,
} from "@/server/customer.server";
import { getTotalCruisePaymentsByCruiseBookingNumber } from "@/utils/custom-utils";

export const addShipAction = async (data: FormData) => {
  try {
    const session = await auth();

    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    if (session?.user?.role !== "ADMIN" && session?.user?.role !== "MANAGER") {
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
            width: 1920, // Set the desired width
            height: 1080, // Set the desired height
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

    if (session?.user?.role !== "ADMIN" && session?.user?.role !== "MANAGER") {
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
            width: 1920, // Set the desired width
            height: 1080, // Set the desired height
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

    if (session?.user?.role !== "ADMIN" && session?.user?.role !== "MANAGER") {
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

    if (session?.user?.role !== "ADMIN" && session?.user?.role !== "MANAGER") {
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
            width: 1920, // Set the desired width
            height: 1080, // Set the desired height
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

    if (session?.user?.role !== "ADMIN" && session?.user?.role !== "MANAGER") {
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
            width: 1920, // Set the desired width
            height: 1080, // Set the desired height
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
    if (session?.user?.role !== "ADMIN" && session?.user?.role !== "MANAGER") {
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

    if (session?.user?.role !== "ADMIN" && session?.user?.role !== "MANAGER") {
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

    const cruise = await getCruiseByDestionation(cruise_id);

    const cruiseId = cruise.cruise_id;

    await sql.query(
      `INSERT INTO cruise_itineraries (cruise_id, day, location, arrive, depart) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [cruiseId, day, location, arrive, depart]
    );

    return {
      success: "Cruise itinerary added successfully",
    };
  } catch (error) {
    console.error({ cruiseItineraryError: error });
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

    if (session?.user?.role !== "ADMIN" && session?.user?.role !== "MANAGER") {
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

    const cruise = await getCruiseByDestionation(cruise_id);

    const cruiseId = cruise.cruise_id;

    await sql.query(
      "UPDATE cruise_itineraries SET cruise_id = $1, day = $2, location = $3, arrive = $4, depart = $5 WHERE cruise_itinerary_id = $6 RETURNING *",
      [cruiseId, day, location, arrive, depart, cruiseItineraryId]
    );

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

export const deleteCruiseItineraryAction = async (id: string) => {
  try {
    const session = await auth();

    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    if (session?.user?.role !== "ADMIN" && session?.user?.role !== "MANAGER") {
      return {
        error: "Unauthorized",
      };
    }

    const cruiseItineraryId = parseInt(id);

    if (!cruiseItineraryId) {
      return {
        error: "Cruise Itinerary ID is required",
      };
    }

    await sql.query(
      "DELETE FROM cruise_itineraries WHERE cruise_itinerary_id = $1",
      [cruiseItineraryId]
    );

    revalidatePath("/dashboard/admin/cruises-admin/itinerary");

    return {
      success: "Cruise Itinerary deleted successfully",
    };
  } catch (error) {
    console.error({ cabinError: error });
    return {
      error: getErrorMessage(error),
    };
  }
};

export const addCruiseAction = async (data: FormData) => {
  try {
    const session = await auth();

    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    if (session?.user?.role !== "ADMIN" && session?.user?.role !== "MANAGER") {
      return {
        error: "Unauthorized",
      };
    }

    const cruise_destination = data.get("cruise_destination");
    const cruise_name = data.get("cruise_name");
    const ship = data.get("ship_id") as string;
    const map_image = data.get("map_image") as File;
    const description = data.get("description");
    const embarkation_date = data.get("embarkation_date");
    const disembarkation_date = data.get("disembarkation_date");
    const duration = data.get("duration") as string;
    const departure_port = data.get("departure_port") as string;
    const cruise_price = data.get("cruise_price") as string;
    const cruise_image = data.get("cruise_image") as File;

    if (!cruise_destination) {
      return {
        error: "Cruise destination is required",
      };
    }

    if (!cruise_name) {
      return {
        error: "Cruise name is required",
      };
    }

    if (!ship) {
      return {
        error: "Ship is required",
      };
    }

    if (!map_image) {
      return {
        error: "Map image is required",
      };
    }

    if (!description) {
      return {
        error: "Description is required",
      };
    }

    if (!embarkation_date) {
      return {
        error: "Embarkation date is required",
      };
    }

    if (!disembarkation_date) {
      return {
        error: "Disembarkation date is required",
      };
    }

    if (!duration) {
      return {
        error: "Duration is required",
      };
    }

    if (!departure_port) {
      return {
        error: "Departure port is required",
      };
    }

    if (!cruise_price) {
      return {
        error: "Cruise price is required",
      };
    }

    if (!cruise_image) {
      return {
        error: "Cruise image is required",
      };
    }

    if (map_image.size > 3000000) {
      return {
        error: "File size exceeds 3mb",
      };
    }

    const mapArrayBuffer = await map_image.arrayBuffer();
    const mapBuffer = Buffer.from(mapArrayBuffer);

    const cruiseArrayBuffer = await cruise_image.arrayBuffer();
    const cruiseBuffer = Buffer.from(cruiseArrayBuffer);

    // Delete existing images in the folder
    await cloudinary.api.delete_resources_by_prefix(`msc/${cruise_name}`);

    // Upload the new image
    const mapUpload = new Promise(async (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            folder: `msc/${cruise_name}/map`,
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
        .end(mapBuffer);
    });

    const cruiseUpload = new Promise(async (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            folder: `msc/${cruise_name}`,
            width: 1920, // Set the desired width
            height: 1080, // Set the desired height
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
        .end(cruiseBuffer);
    });

    const mapImageUrl = await mapUpload;
    const cruiseImageUrl = await cruiseUpload;

    const { ship_id } = await getShipByName(ship);

    await sql.query(
      "INSERT INTO cruises (cruise_destination, cruise_name, ship_id, map_image, description, embarkation_date, disembarkation_date, duration, departure_port, cruise_price, cruise_image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
      [
        cruise_destination,
        cruise_name,
        ship_id,
        mapImageUrl,
        description,
        embarkation_date,
        disembarkation_date,
        duration,
        departure_port,
        cruise_price,
        cruiseImageUrl,
      ]
    );

    return {
      success: "Cruise added successfully",
    };
  } catch (error) {
    console.error({ cruiseError: error });
    return {
      error: getErrorMessage(error),
    };
  }
};

export const updateCruiseAction = async (data: FormData, id: string) => {
  try {
    const session = await auth();

    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    if (session?.user?.role !== "ADMIN" && session?.user?.role !== "MANAGER") {
      return {
        error: "Unauthorized",
      };
    }

    const cruiseId = parseInt(id);

    const cruise_destination = data.get("cruise_destination");
    const cruise_name = data.get("cruise_name");
    const ship = data.get("ship_id") as string;
    const map_image = data.get("map_image") as File;
    const description = data.get("description");
    const embarkation_date = data.get("embarkation_date");
    const disembarkation_date = data.get("disembarkation_date");
    const duration = data.get("duration") as string;
    const departure_port = data.get("departure_port") as string;
    const cruise_price = data.get("cruise_price") as string;
    const cruise_image = data.get("cruise_image") as File;

    if (!cruiseId) {
      return {
        error: "Cruise ID is required",
      };
    }

    if (!cruise_destination) {
      return {
        error: "Cruise destination is required",
      };
    }

    if (!cruise_name) {
      return {
        error: "Cruise name is required",
      };
    }

    if (!ship) {
      return {
        error: "Ship is required",
      };
    }

    if (!map_image) {
      return {
        error: "Map image is required",
      };
    }

    if (!description) {
      return {
        error: "Description is required",
      };
    }

    if (!embarkation_date) {
      return {
        error: "Embarkation date is required",
      };
    }

    if (!disembarkation_date) {
      return {
        error: "Disembarkation date is required",
      };
    }

    if (!duration) {
      return {
        error: "Duration is required",
      };
    }

    if (!departure_port) {
      return {
        error: "Departure port is required",
      };
    }

    if (!cruise_price) {
      return {
        error: "Cruise price is required",
      };
    }

    if (!cruise_image) {
      return {
        error: "Cruise image is required",
      };
    }

    if (map_image.size > 3000000) {
      return {
        error: "File size exceeds 3mb",
      };
    }

    const mapArrayBuffer = await map_image.arrayBuffer();
    const mapBuffer = Buffer.from(mapArrayBuffer);

    const cruiseArrayBuffer = await cruise_image.arrayBuffer();
    const cruiseBuffer = Buffer.from(cruiseArrayBuffer);

    // Delete existing images in the folder
    await cloudinary.api.delete_resources_by_prefix(`msc/${cruise_name}`);

    // Upload the new image
    const mapUpload = new Promise(async (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            folder: `msc/${cruise_name}/map`,
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
        .end(mapBuffer);
    });

    const cruiseUpload = new Promise(async (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            folder: `msc/${cruise_name}`,
            width: 1920, // Set the desired width
            height: 1080, // Set the desired height
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
        .end(cruiseBuffer);
    });

    const mapImageUrl = await mapUpload;
    const cruiseImageUrl = await cruiseUpload;

    const { ship_id } = await getShipByName(ship);

    await sql.query(
      "UPDATE cruises SET cruise_destination=$1, cruise_name=$2, ship_id=$3, map_image=$4, description=$5, embarkation_date=$6, disembarkation_date=$7, duration=$8, departure_port=$9, cruise_price=$10, cruise_image=$11 WHERE cruise_id = $12 RETURNING *",
      [
        cruise_destination,
        cruise_name,
        ship_id,
        mapImageUrl,
        description,
        embarkation_date,
        disembarkation_date,
        duration,
        departure_port,
        cruise_price,
        cruiseImageUrl,
        cruiseId,
      ]
    );

    return {
      success: "Cruise updated successfully",
    };
  } catch (error) {
    console.error({ cruiseError: error });
    return {
      error: getErrorMessage(error),
    };
  }
};

export const deleteCruiseAction = async (id: string) => {
  try {
    const session = await auth();

    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    if (session?.user?.role !== "ADMIN" && session?.user?.role !== "MANAGER") {
      return {
        error: "Unauthorized",
      };
    }

    const cruiseId = parseInt(id);
    if (!cruiseId) {
      return {
        error: "Cruise ID is required",
      };
    }

    await sql.query("DELETE FROM cruises WHERE cruise_id = $1", [cruiseId]);

    revalidatePath("/dashboard/admin/cruises-admin/manage-cruises");

    return {
      success: "Cruise deleted successfully",
    };
  } catch (error) {
    console.error({ cruiseError: error });
    return {
      error: getErrorMessage(error),
    };
  }
};

export async function addCustomerCruiseBookingAction(
  data: CustomerType,
  id: string
) {
  try {
    const cruiseId = parseInt(id);

    if (!cruiseId) {
      return {
        error: "Cruise ID is required",
      };
    }

    const results = customerSchema.safeParse(data);

    console.log({ results });

    if (!results.success) {
      return {
        error: results.error.errors[0].message,
      };
    }

    const {
      first_name,
      last_name,
      email,
      phone_number,
      date_of_birth,
      gender,
      cruise_number_of_adults,
      cruise_number_of_kids,
    } = results.data;

    const customerExists = await getCustomerByEmail(email);

    if (!customerExists) {
      const { rows: customer } = await sql.query(
        "INSERT INTO customers (first_name, last_name, customer_email, phone_number, date_of_birth, gender) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [first_name, last_name, email, phone_number, date_of_birth, gender]
      );

      if (customer) {
        await sql.query(
          "INSERT INTO cruise_bookings (customer_id, cruise_id, cruise_number_of_adults, cruise_number_of_kids, booked_by) VALUES ($1, $2, $3, $4, $5) RETURNING *",
          [
            customer[0].customer_id,
            cruiseId,
            cruise_number_of_adults,
            cruise_number_of_kids,
            customer[0].customer_id,
          ]
        );
      }

      console.log("Cruise booking added successfully");
      return {
        success: "Cruise booking added successfully",
      };
    }

    const alreadyBooked = await getCruiseBookingByCustomerId(
      customerExists.customer_id
    );

    if (alreadyBooked) {
      return {
        error: "Cruise booking already exists",
      };
    }

    await sql.query(
      "INSERT INTO cruise_bookings (customer_id, cruise_id, cruise_number_of_adults, cruise_number_of_kids, booked_by) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        customerExists.customer_id,
        cruiseId,
        cruise_number_of_adults,
        cruise_number_of_kids,
        customerExists.customer_id,
      ]
    );

    revalidatePath("/dashboard/admin");

    return {
      success: "Cruise booking added successfully",
    };
  } catch (error) {
    console.log({ bookingError: error });
    return {
      error: getErrorMessage(error),
    };
  }
}

export async function addPreviousTotalCruiseBookingPriceAction(prevTotalPrice: number) {

  try {

    if (!prevTotalPrice) {
      return {
        error: "Previous total price is required",
      }
    }

    const { rows: previousTotalPrice } = await sql.query("SELECT * FROM prev_cruise_total_price")

    if (previousTotalPrice.length !== 0) {

      await sql.query("DELETE FROM prev_cruise_total_price")

    }


    await sql.query("INSERT INTO prev_cruise_total_price (prev_cruise_total_price) VALUES ($1)", [prevTotalPrice])

    return {
      success: "Previous total price added successfully",
    };


  } catch (error) {
    console.log({ error })
    return {
      error: getErrorMessage(error),
    };
  }

}

export async function addCruiseBookingAction(data: CruiseBookingType) {
  try {
    const session = await auth();

    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    const userId = session?.user?.user_id;

    const results = cruiseBookingSchema.safeParse(data);

    if (!results.success) {
      return {
        error: results.error.errors[0].message,
      };
    }

    const {
      cruise_name,
      phone_number,
      cruise_number_of_adults,
      cruise_number_of_kids,
    } = results.data;

    const customer = await getCustomerByPhoneNumber(phone_number);

    const cruise = await getCruiseByName(cruise_name);

    const alreadyBooked = await getCruiseBookingByCustomerId(
      customer.customer_id
    );

    if (alreadyBooked) {
      return {
        error: "Cruise booking already exists",
      };
    }

    await sql.query(
      "INSERT INTO cruise_bookings (customer_id, cruise_id, cruise_number_of_adults, cruise_number_of_kids, booked_by) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        customer.customer_id,
        cruise.cruise_id,
        cruise_number_of_adults,
        cruise_number_of_kids,
        userId,
      ]
    );

    revalidatePath("/dashboard/admin");

    return {
      success: "Cruise booking added successfully",
    };
  } catch (error) {
    console.log({ bookingError: error });
    return {
      error: getErrorMessage(error),
    };
  }
}

export async function updateCruiseBookingAction(
  data: CruiseBookingType,
  id: string
) {
  try {
    const session = await auth();

    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    const cruiseBookingNumber = parseInt(id);

    if (!cruiseBookingNumber) {
      return {
        error: "Cruise booking ID is required",
      };
    }

    const userId = session?.user?.user_id;

    const results = cruiseBookingSchema.safeParse(data);

    if (!results.success) {
      return {
        error: results.error.errors[0].message,
      };
    }

    const {
      cruise_name,
      phone_number,
      cruise_number_of_adults,
      cruise_number_of_kids,
    } = results.data;

    const customer = await getCustomerByPhoneNumber(phone_number);

    const cruise = await getCruiseByName(cruise_name);

    await sql.query(
      "UPDATE cruise_bookings SET customer_id = $1, cruise_id = $2, cruise_number_of_adults = $3, cruise_number_of_kids = $4, booked_by = $5 WHERE cruise_booking_number = $6",
      [
        customer.customer_id,
        cruise.cruise_id,
        cruise_number_of_adults,
        cruise_number_of_kids,
        userId,
        cruiseBookingNumber,
      ]
    );

    return {
      success: "Cruise booking updated successfully",
    };
  } catch (error) {
    console.log({ bookingError: error });
    return {
      error: getErrorMessage(error),
    };
  }
}

export async function CruiseBookingPaymentAction(
  data: CruiseBookingPaymentType,
  id: string
) {
  try {
    const session = await auth();

    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    const cruiseBookingNumber = parseInt(id);

    if (!cruiseBookingNumber) {
      return {
        error: "Cruise booking ID is required",
      };
    }

    const userId = session?.user?.user_id;

    const results = cruiseBookingPaymentSchema.safeParse(data);

    if (!results.success) {
      return {
        error: results.error.errors[0].message,
      };
    }

    const { cruise_payment_amount, cruise_payment_method } = results.data;

    const booking = await getCruiseBookingByBookingNumber(cruiseBookingNumber);

    if (!booking) {
      return {
        error: "Cruise booking not found",
      };
    }

    const cruise = await getCruiseById(booking.cruise_id);

    if (!cruise) {
      return {
        error: "Cruise not found",
      };
    }


    const cruisePrice = cruise.cruise_price;
    const totalCruisePayments = await getTotalCruisePaymentsByCruiseBookingNumber(cruiseBookingNumber) as number;


    console.log({ totalCruisePayments })

    if (totalCruisePayments + Number(cruise_payment_amount) > cruise.cruise_price) {
      return { error: "Cruise payment amount cannot be greater than cruise price" };
    }
    let status = booking.status;

    const { rows: payCruiseBooking } = await sql.query("INSERT INTO cruise_booking_payments (cruise_booking_number, cruise_payment_amount, cruise_payment_method, recieved_by) VALUES ($1, $2, $3, $4) RETURNING *", [cruiseBookingNumber, cruise_payment_amount, cruise_payment_method, userId])

    if (payCruiseBooking.length !== 0) {

      console.log({ payCruiseBooking })

      if (parseFloat(payCruiseBooking[0].cruise_payment_amount) > 3000) {
        status = "confirmed";
      }

      if (parseFloat(payCruiseBooking[0].cruise_payment_amount) < cruise.cruise_price) {
        status = "confirmed";
      }

      if (parseFloat(payCruiseBooking[0].cruise_payment_amount) === cruise.cruise_price) {
        status = "completed";
      }


      const cruiseBalanceDue = totalCruisePayments + Number(payCruiseBooking[0].cruise_payment_amount) - Number(cruisePrice);

      const { rows: updateCruiseBooking } = await sql.query(
        "UPDATE cruise_bookings SET status = $1, cruise_balance_due = $2 WHERE cruise_booking_number = $3",
        [
          status,
          cruiseBalanceDue,
          payCruiseBooking[0].cruise_booking_number
        ]
      );


      if (updateCruiseBooking) {

        return {
          success: "Cruise booking payment added successfully",
        };

      }

    }

  } catch (error) {
    console.log({ paymentError: error });
    return {
      error: getErrorMessage(error),
    };
  }
}

export async function deleteCruiseBookingAction(id: string) {
  try {
    const session = await auth();

    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    const cruiseBookingNumber = parseInt(id);

    if (!cruiseBookingNumber) {
      return {
        error: "Cruise booking ID is required",
      };
    }

    const userId = session?.user?.user_id;

    const cruiseBooking = await getCruiseBookingByBookingNumber(
      cruiseBookingNumber
    );


    const totalAmount = await getTotalCruisePaymentsByCruiseBookingNumber(cruiseBookingNumber) as number;

    console.log({ totalAmount });

    if (!cruiseBooking) {
      return {
        error: "Cruise booking not found",
      };
    }

    const notes = `Cruise booking deleted by ${userId} on ${new Date().toLocaleString()}`;

    await sql.query(
      "INSERT INTO cruise_booking_history (cruise_booking_number, msc_ref_number, customer_id, status, cruise_payment_amount, booked_by, deleted_by, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        cruiseBooking.cruise_booking_number,
        cruiseBooking.msc_ref_number,
        cruiseBooking.customer_id,
        cruiseBooking.status,
        totalAmount,
        cruiseBooking.booked_by,
        userId,
        notes,
      ]
    );

    await sql.query(
      "DELETE FROM cruise_bookings WHERE cruise_booking_number = $1",
      [cruiseBookingNumber]
    );

    revalidatePath("/dashboard/admin/cruise-admin/cruise-bookings");

    return {
      success: "Cruise booking deleted successfully",
    };
  } catch (error) {
    console.log({ bookingError: error });
    return {
      error: getErrorMessage(error),
    };
  }
}
