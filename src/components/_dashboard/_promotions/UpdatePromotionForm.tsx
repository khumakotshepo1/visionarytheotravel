"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CustomInput } from "@/components/custom-input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { CloudUploadIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PromotionsType } from "@/zod/types/promotions.type";
import { promotionsSchema } from "@/zod/schemas/promotions.schema";
import { updatePromotionAction } from "@/actions/promotion.action";

export function UpdatePromotionForm({ promotion }: { promotion: PromotionsPropsType }) {
  const { refresh, back } = useRouter();

  const [promotionImagePreview, setPromotionImagePreview] = useState<
    string | null
  >(null);

  const form = useForm<PromotionsType>({
    resolver: zodResolver(promotionsSchema),
    defaultValues: {
      promotion_name: promotion?.promotion_name,
      promotion_url: promotion?.promotion_url,
      promotion_image: promotion?.promotion_image
    },
  });

  const validateFile = (fileList: FileList) => {
    const file = fileList[0];
    if (!file) return true; // No file selected
    const isImage = file.type.startsWith("image/");
    return isImage || "Please select a valid image file.";
  };

  const promotionId = promotion?.promotion_id

  useEffect(() => {
    setPromotionImagePreview(promotion?.promotion_image)
  }, [promotion?.promotion_image])

  const processForm = async (data: PromotionsType) => {
    const formData = new FormData();

    formData.append("promotion_image", data.promotion_image[0]);
    formData.append("promotion_name", data.promotion_name);
    formData.append("promotion_url", data.promotion_url);

    const res = await updatePromotionAction(formData, promotionId);
    if (res?.error) {
      toast.error(res.error);
    } else if (res?.success) {
      toast.success(res.success);
      form.reset();
      refresh();
      setTimeout(() => {
        back();
      }, 2000);
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setPreview: (url: string | null) => void
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setPreview(fileURL);
    }
  };

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center">
      <div className="space-y-4 max-sm-w-xl w-[450px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(processForm)}>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="promotion_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel></FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Promotion Name"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CustomInput
                control={form.control}
                name="promotion_url"
                label=""
                placeholder="Promotion Url"
                type="text"
              />
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="promotion_image">
                  <span className="flex gap-2 items-center justify-center py-3 border-2 border-dashed border-foreground">
                    <CloudUploadIcon className="h-4 w-4" /> Promotion Image
                  </span>
                </Label>
                <Input
                  id="promotion_image"
                  type="file"
                  {...form.register("promotion_image", { validate: validateFile })}
                  className="sr-only"
                  onChange={(e) => handleFileChange(e, setPromotionImagePreview)}
                  required
                />
                {promotionImagePreview && (
                  <Image
                    src={promotionImagePreview}
                    width={200}
                    height={200}
                    alt="Promotion Preview"
                  />
                )}
                <FormMessage />
              </div>
            </div>
            <div className="grid gap-4 py-3">
              <Button
                disabled={form.formState.isSubmitting}
                type="submit"
                className="w-full bg-crimsonElement dark:bg-crimsonElement text-lightElement dark:text-lightElement"
              >
                {form.formState.isSubmitting ? (
                  <Icons.spinner className="h-4 w-4 animate-spin" />
                ) : (
                  "Save"
                )}
              </Button>

              <Button
                disabled={form.formState.isSubmitting}
                className="w-full"
                onClick={() => {
                  back();
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
