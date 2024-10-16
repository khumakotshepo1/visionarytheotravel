"use server";

import { auth } from "@/auth";
import { sql } from "@/database";
import cloudinary from "@/lib/cloudinary";
import { getPromotionByName } from "@/server/promotions.server";
import { getErrorMessage } from "@/utils/error-message";
import { revalidatePath } from "next/cache";

export const addPromotionAction = async (data: FormData) => {
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

    const promotion_name = data.get("promotion_name") as string;
    const promotion_image = data.get("promotion_image") as File;
    const promotion_url = data.get("promotion_url") as string;

    if (!promotion_name) {
      return {
        error: "Promotion name is required",
      };
    }

    if (!promotion_image) {
      return {
        error: "Promotion image is required",
      }
    }

    if (!promotion_url) {
      return {
        error: "Promotion url is required",
      }
    }

    if (promotion_image.size > 3000000) {
      return {
        error: "File size exceeds 3mb",
      };
    }

    const promotionArrayBuffer = await promotion_image.arrayBuffer();
    const promotionBuffer = Buffer.from(promotionArrayBuffer);

    // Delete existing images in the folder
    await cloudinary.api.delete_resources_by_prefix(`promotions/${promotion_name}`);

    // Upload the new image

    const promotionUpload = new Promise(async (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            folder: `promotions/${promotion_name}`,
            //            width: 1920, // Set the desired width
            //            height: 1080, // Set the desired height
            //            crop: "fill", // Crop the image to fit the specified dimensions
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          async (error: any, result: any) => {
            if (error) {
              return reject(error.message);
            }
            return resolve(result?.secure_url);
          },
        )
        .end(promotionBuffer);
    });

    const promotionImageUrl = await promotionUpload;

    const promotionExists = await getPromotionByName(promotion_name) as PromotionsPropsType;

    if (promotionExists) {

      return {
        error: "Promotion already exists",
      };
    }


    await sql.query("INSERT INTO promotions (promotion_name, promotion_image, promotion_url) VALUES ($1, $2, $3) RETURNING *", [promotion_name, promotionImageUrl, promotion_url]);

    revalidatePath("/dashboard/admin/promotions");

    return { success: "Promotion added successfully" };


  } catch (error) {
    console.error({ promotionError: error });
    return {
      error: getErrorMessage(error),
    };
  }
};

export const updatePromotionAction = async (data: FormData, id: string) => {
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

    const promotionId = parseInt(id);

    const promotion_name = data.get("promotion_name") as string;
    const promotion_image = data.get("promotion_image") as File;
    const promotion_url = data.get("promotion_url") as string;

    if (!promotion_name) {
      return {
        error: "Promotion name is required",
      };
    }

    if (!promotion_image) {
      return {
        error: "Promotion image is required",
      }
    }

    if (!promotion_url) {
      return {
        error: "Promotion url is required",
      }
    }

    if (promotion_image.size > 3000000) {
      return {
        error: "File size exceeds 3mb",
      };
    }

    const promotionArrayBuffer = await promotion_image.arrayBuffer();
    const promotionBuffer = Buffer.from(promotionArrayBuffer);

    // Delete existing images in the folder
    await cloudinary.api.delete_resources_by_prefix(`promotions/${promotion_name}`);

    // Upload the new image

    const promotionUpload = new Promise(async (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            folder: `promotions/${promotion_name}`,
            //            width: 1920, // Set the desired width
            //            height: 1080, // Set the desired height
            //            crop: "fill", // Crop the image to fit the specified dimensions
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          async (error: any, result: any) => {
            if (error) {
              return reject(error.message);
            }
            return resolve(result?.secure_url);
          },
        )
        .end(promotionBuffer);
    });

    const promotionImageUrl = await promotionUpload;

    const promotionExists = await getPromotionByName(promotion_name) as PromotionsPropsType;

    if (promotionExists && promotionExists.promotion_name !== promotion_name) {

      return {
        error: "Promotion already exists",
      };
    }


    await sql.query("UPDATE promotions SET promotion_name = $1, promotion_image = $2, promotion_url = $3 WHERE promotion_id = $4", [promotion_name, promotionImageUrl, promotion_url, promotionId]);

    revalidatePath("/dashboard/admin/promotions");

    return { success: "Promotion updated successfully" };


  } catch (error) {
    console.error({ promotionError: error });
    return {
      error: getErrorMessage(error),
    };
  }
};
