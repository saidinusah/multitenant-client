import {toTypedSchema} from "@vee-validate/zod";
import {object, string} from "zod";
import {REGEXES} from "~/lib/constant";

export const membersCrudSchema = toTypedSchema(object({
    foreNames: string().min(3, "Fore name is required"),
    phoneNumber: string().regex(REGEXES.GHANA_PHONE_NUMBER, 'Check format of phone number'),
    lastName: string().min(3, "Last name is required"),
    idNumber: string().regex(REGEXES.ECOWAS_CARD, 'Check format of Ecowas card number')
}))