"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { AlertCircle, Loader2 } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const INDUSTRIES = [
  "Sports & Fitness",
  "Fashion & Apparel",
  "Electronics",
  "Home & Furniture",
  "Beauty & Personal Care",
  "Grocery & Food",
  "Other",
];

const signupSchema = z.object({
  business_name: z.string().min(2, "Enter your business name."),
  owner_name: z.string().min(2, "Enter your full name."),
  email: z.string().email("Enter a valid email address."),
  phone: z.string().min(6, "Enter a valid phone number."),
  industry: z.string().min(1, "Select an industry."),
  password: z
    .string()
    .min(8, "Use at least 8 characters."),
});

const initialForm = {
  business_name: "",
  owner_name: "",
  email: "",
  phone: "",
  industry: "",
  password: "",
};

export default function SignupForm() {
  const router = useRouter();
  const { signup } = useAuth();

  const [form, setForm] = useState(initialForm);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setFormError(null);

    const result = signupSchema.safeParse(form);
    if (!result.success) {
      const errors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        errors[String(issue.path[0])] = issue.message;
      }
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});

    setSubmitting(true);
    try {
      await signup(result.data);
      router.push("/dashboard");
    } catch (err) {
      const message =
        (err as { response?: { data?: { detail?: string } } })?.response
          ?.data?.detail || "Something went wrong. Please try again.";
      setFormError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formError && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {formError}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label htmlFor="business_name" className="text-sm font-medium">
            Business name
          </label>
          <Input
            id="business_name"
            value={form.business_name}
            onChange={(e) => update("business_name", e.target.value)}
            placeholder="SportZone India"
            aria-invalid={Boolean(fieldErrors.business_name)}
          />
          {fieldErrors.business_name && (
            <p className="text-xs text-destructive">
              {fieldErrors.business_name}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="owner_name" className="text-sm font-medium">
            Your name
          </label>
          <Input
            id="owner_name"
            value={form.owner_name}
            onChange={(e) => update("owner_name", e.target.value)}
            placeholder="Rahul Sharma"
            aria-invalid={Boolean(fieldErrors.owner_name)}
          />
          {fieldErrors.owner_name && (
            <p className="text-xs text-destructive">
              {fieldErrors.owner_name}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm font-medium">
          Work email
        </label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="you@business.com"
          aria-invalid={Boolean(fieldErrors.email)}
        />
        {fieldErrors.email && (
          <p className="text-xs text-destructive">{fieldErrors.email}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label htmlFor="phone" className="text-sm font-medium">
            Phone
          </label>
          <Input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+91 98765 43210"
            aria-invalid={Boolean(fieldErrors.phone)}
          />
          {fieldErrors.phone && (
            <p className="text-xs text-destructive">{fieldErrors.phone}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="industry" className="text-sm font-medium">
            Industry
          </label>
          <select
            id="industry"
            value={form.industry}
            onChange={(e) => update("industry", e.target.value)}
            aria-invalid={Boolean(fieldErrors.industry)}
            className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
          >
            <option value="" disabled>
              Select…
            </option>
            {INDUSTRIES.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
          {fieldErrors.industry && (
            <p className="text-xs text-destructive">{fieldErrors.industry}</p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          value={form.password}
          onChange={(e) => update("password", e.target.value)}
          placeholder="At least 8 characters"
          aria-invalid={Boolean(fieldErrors.password)}
        />
        {fieldErrors.password && (
          <p className="text-xs text-destructive">{fieldErrors.password}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {submitting ? "Creating account…" : "Create account"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}