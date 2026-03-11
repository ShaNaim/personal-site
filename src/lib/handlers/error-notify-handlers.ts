import { ZodError } from "zod";
import { toast } from "sonner";
import type { FieldErrors, FieldValues } from "react-hook-form";

type ZodIssue = ZodError["issues"][number];
type ZodIssuePath = ZodIssue["path"];

type SonnerToastOptions = Parameters<typeof toast.error>[1];

interface NotifyOptions {
  /** Override the toast title. Defaults to "Validation Error" */
  title?: string;
  /** Show only the first error instead of all errors. Defaults to false */
  firstOnly?: boolean;
  /** Extra Sonner toast options (duration, position, id, etc.) */
  toastOptions?: SonnerToastOptions;
}

interface ZodErrorNotifyOptions extends NotifyOptions {
  /** Format how the field path is displayed. Defaults to dot notation (e.g. "user.email") */
  formatPath?: (path: ZodIssuePath) => string;
}

function defaultFormatPath(path: ZodIssuePath): string {
  return path
    .map((segment, i) => {
      if (typeof segment === "number") return `[${segment}]`;
      return i === 0 ? segment : String(segment);
    })
    .join("");
}

function formatIssue(issue: ZodIssue, formatPath: (path: ZodIssuePath) => string): string {
  const fieldPath = formatPath(issue.path);
  const prefix = fieldPath ? `${fieldPath}: ` : "";
  return `${prefix}${issue.message}`;
}

/**
 * Recursively walks a FieldErrors object and collects all error messages,
 * prefixed with their field path (e.g. "email: Invalid email address").
 *
 * Handles nested objects and array fields produced by RHF + zodResolver.
 */
function collectFieldErrors(errors: FieldErrors, prefix = ""): string[] {
  const messages: string[] = [];

  for (const [key, value] of Object.entries(errors)) {
    if (!value) continue;

    const path = prefix ? `${prefix}.${key}` : key;

    if (typeof value.message === "string") {
      messages.push(`${path}: ${value.message}`);
    } else {
      messages.push(...collectFieldErrors(value as FieldErrors, path));
    }
  }

  return messages;
}

function fireToast(messages: string[], title: string, toastOptions: SonnerToastOptions): void {
  if (messages.length === 0) return;

  toast.error(title, {
    description: messages.join("\n"),
    ...toastOptions,
  });
}

/**
 * Displays a Sonner toast for a ZodError (from safeParse / manual validation).
 *
 * @example
 * ```ts
 * const result = MySchema.safeParse(data);
 * if (!result.success) {
 *   notifyZodError(result.error);
 * }
 * ```
 */
export function notifyZodError(error: ZodError, options: ZodErrorNotifyOptions = {}): void {
  const { title = "Validation Error", firstOnly = false, formatPath = defaultFormatPath, toastOptions = {} } = options;

  const issues = firstOnly ? error.issues.slice(0, 1) : error.issues;
  const messages = issues.map((issue) => formatIssue(issue, formatPath));

  fireToast(messages, title, toastOptions);
}

/**
 * Displays a Sonner toast for React Hook Form's FieldErrors.
 * Pass this directly as the second argument of handleSubmit.
 *
 * @example
 * ```ts
 * const onError = (errors: FieldErrors<FormData>) => {
 *   notifyFormError(errors);
 * };
 *
 * <Button onClick={handleSubmit(onSubmit, onError)} />
 * ```
 */
export function notifyFormError<T extends FieldValues>(errors: FieldErrors<T>, options: NotifyOptions = {}): void {
  const { title = "Validation Error", firstOnly = false, toastOptions = {} } = options;

  const allMessages = collectFieldErrors(errors as FieldErrors);
  const messages = firstOnly ? allMessages.slice(0, 1) : allMessages;

  fireToast(messages, title, toastOptions);
}

/** Type guard — returns true if the value is a ZodError. */
export function isZodError(error: unknown): error is ZodError {
  return error instanceof ZodError;
}

/**
 * Catch-all handler for unknown errors in try/catch blocks.
 * Routes to notifyZodError if it's a ZodError, otherwise shows a generic toast.
 *
 * @example
 * ```ts
 * try {
 *   MySchema.parse(data);
 * } catch (err) {
 *   handleUnknownError(err);
 * }
 * ```
 */
export function handleUnknownError(error: unknown, options: ZodErrorNotifyOptions & { fallbackMessage?: string } = {}): void {
  const { fallbackMessage = "An unexpected error occurred.", ...zodOptions } = options;

  if (isZodError(error)) {
    notifyZodError(error, zodOptions);
  } else {
    const message = error instanceof Error ? error.message : fallbackMessage;
    toast.error("Error", { description: message });
  }
}
