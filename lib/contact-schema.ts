import { z } from "zod";
import { services } from "@/lib/content";

export const serviceOptions = [
  ...services.map((s) => ({ value: s.slug, label: s.title })),
  { value: "customs", label: "Customs brokerage" },
  { value: "warehousing", label: "Warehousing and fulfilment" },
  { value: "other", label: "Something else" },
] as const;

const serviceValues = serviceOptions.map((o) => o.value) as [string, ...string[]];

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your name.")
    .max(100, "Keep your name under 100 characters."),
  company: z.string().trim().max(120, "Keep the company name under 120 characters."),
  email: z
    .string()
    .trim()
    .max(200, "Keep the email under 200 characters.")
    .pipe(z.email("Enter a valid email address, like name@company.com.")),
  phone: z
    .string()
    .trim()
    .max(40, "Keep the phone number under 40 characters.")
    .regex(/^[+()\d\s.-]*$/, "Use digits, spaces and + ( ) - only."),
  service: z.union([z.enum(serviceValues), z.literal("")]),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more about your shipment (at least 10 characters).")
    .max(5000, "Keep your message under 5,000 characters."),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<ContactField, string>>;
  /** Echo of submitted values so the form keeps them after a failed send. */
  values?: Partial<Record<ContactField, string>>;
};

export const initialContactState: ContactState = { status: "idle" };

export function serviceLabel(value: string) {
  return serviceOptions.find((o) => o.value === value)?.label ?? "Not specified";
}
