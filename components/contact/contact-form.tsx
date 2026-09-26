"use client";

import { useActionState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CircleCheck, TriangleAlert } from "lucide-react";
import { sendContact } from "@/app/contact/actions";
import { Button } from "@/components/ui/stateful-button";
import { Input, Label, Select, Textarea } from "@/components/ui/input";
import {
  initialContactState,
  serviceOptions,
  type ContactField,
} from "@/lib/contact-schema";
import { contact } from "@/lib/content";

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          id={id}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="text-caption mt-1.5 text-[#b83232]"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export function ContactForm({ defaultService = "" }: { defaultService?: string }) {
  const [state, formAction, pending] = useActionState(sendContact, initialContactState);
  // Recorded on mount so the server can reject instant (bot) submissions.
  const mountedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const submit = (formData: FormData) => {
    formData.set("startedAt", String(mountedAt.current));
    formAction(formData);
  };

  const errors = state.fieldErrors ?? {};
  const values = state.values ?? {};
  const status = pending ? "loading" : state.status === "success" ? "success" : "idle";

  // Move focus to the first invalid field after a failed submit.
  useEffect(() => {
    if (state.status !== "error" || !state.fieldErrors) return;
    const first = Object.keys(state.fieldErrors)[0];
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }, [state]);

  const field = (name: ContactField) => ({
    id: `contact-${name}`,
    name,
    defaultValue: values[name],
    invalid: Boolean(errors[name]),
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
  });

  if (state.status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        role="status"
        className="flex min-h-[420px] flex-col items-center justify-center rounded-panel bg-mist p-10 text-center"
      >
        <motion.span
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-green text-white"
        >
          <CircleCheck className="h-8 w-8" />
        </motion.span>
        <h2 className="text-display-md mt-6 text-ink">Message sent</h2>
        <p className="text-body mt-3 max-w-sm text-ink-muted">
          {state.message ?? "Thanks for getting in touch. We'll reply by email."}
        </p>
        <p className="text-caption mt-6 text-ink-subtle">
          Urgent shipment? Call{" "}
          <a href={contact.phoneHref} className="text-brand-blue hover:underline">
            {contact.phone}
          </a>
        </p>
      </motion.div>
    );
  }

  return (
    <form ref={formRef} action={submit} noValidate className="space-y-5">
      {/* Honeypot: hidden from people, tempting to bots */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="contact-name">Name</Label>
          <Input {...field("name")} autoComplete="name" required placeholder="Your full name" />
          <FieldError id="contact-name-error" message={errors.name} />
        </div>
        <div>
          <Label htmlFor="contact-company">
            Company <span className="font-normal text-ink-subtle">(optional)</span>
          </Label>
          <Input {...field("company")} autoComplete="organization" placeholder="Company name" />
          <FieldError id="contact-company-error" message={errors.company} />
        </div>
        <div>
          <Label htmlFor="contact-email">Email</Label>
          <Input
            {...field("email")}
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            placeholder="name@company.com"
          />
          <FieldError id="contact-email-error" message={errors.email} />
        </div>
        <div>
          <Label htmlFor="contact-phone">
            Phone <span className="font-normal text-ink-subtle">(optional)</span>
          </Label>
          <Input
            {...field("phone")}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+94 77 123 4567"
          />
          <FieldError id="contact-phone-error" message={errors.phone} />
        </div>
      </div>

      <div>
        <Label htmlFor="contact-service">What do you need help with?</Label>
        <Select {...field("service")} defaultValue={values.service ?? defaultService}>
          <option value="">Choose a service</option>
          {serviceOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>
        <FieldError id="contact-service-error" message={errors.service} />
      </div>

      <div>
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          {...field("message")}
          required
          rows={6}
          placeholder="What are you shipping, from where to where, and roughly when?"
        />
        <FieldError id="contact-message-error" message={errors.message} />
      </div>

      <AnimatePresence initial={false}>
        {state.status === "error" && state.message && (
          <motion.div
            role="alert"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-caption flex items-start gap-2.5 rounded-card bg-[#fdf0f0] px-4 py-3 text-[#8f2424]"
          >
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{state.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col-reverse items-start gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-fine max-w-xs text-ink-subtle">
          Your message goes to {contact.email}. We only use your details to reply.
        </p>
        <Button type="submit" status={status} disabled={pending} loadingText="Sending" successText="Sent">
          Send message
        </Button>
      </div>
    </form>
  );
}
