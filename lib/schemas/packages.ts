import { toTypedSchema } from "@vee-validate/zod";
import { object, string, boolean, number } from "zod";

export const packagesCrudSchema = toTypedSchema(object({
    name: string().min(3, "Name is required"),
    description: string().nullable().optional(),
    amount: number().min(50, 'Minimum amount must be 50').positive(),
    isActive: boolean(),
    renewalPeriod: string()
}))
