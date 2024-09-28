import { z } from "zod";
import { customerSchema } from "../schemas/customer.schema";

export type CustomerType = z.infer<typeof customerSchema>;
