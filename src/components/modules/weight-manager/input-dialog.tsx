import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { toast } from "sonner";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWeightStore } from "@/hooks/use-weight-store";

const schema = z.object({
  weight: z
    .string()
    .min(1, "Weight is required")
    .refine((v) => !isNaN(parseFloat(v)) && parseFloat(v) > 0 && parseFloat(v) < 500, {
      message: "Enter a valid weight (0–500 kg)",
    }),
});

type FormValues = z.infer<typeof schema>;

interface WeightInputDialogProps {
  date: Date | null;
  onClose: () => void;
}

export function WeightInputDialog({ date, onClose }: WeightInputDialogProps) {
  const { setEntry, getEntry, removeEntry } = useWeightStore();

  const dateKey = date ? format(date, "yyyy-MM-dd") : null;
  const existing = dateKey ? getEntry(dateKey) : undefined;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { weight: existing ? String(existing) : "" },
  });

  useEffect(() => {
    reset({ weight: existing ? String(existing) : "" });
  }, [dateKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = (values: FormValues) => {
    if (!dateKey) return;
    setEntry(dateKey, parseFloat(values.weight));
    toast.success(existing ? `Updated weight for ${format(date!, "MMM d, yyyy")}` : `Logged ${values.weight} kg for ${format(date!, "MMM d, yyyy")}`);
    onClose();
  };

  const handleDelete = () => {
    if (!dateKey) return;
    removeEntry(dateKey);
    toast.success(`Removed entry for ${format(date!, "MMM d, yyyy")}`);
    onClose();
  };

  return (
    <Dialog open={!!date} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-mono text-sm uppercase tracking-widest text-muted-foreground">{date ? format(date, "EEEE, MMMM d yyyy") : ""}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field data-invalid={!!errors.weight}>
            <FieldLabel htmlFor="weight" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Weight (kg)
            </FieldLabel>
            <div className="relative">
              <Input id="weight" type="number" step="0.1" placeholder="e.g. 72.5" className="pr-10 font-mono text-lg" aria-invalid={!!errors.weight} autoFocus {...register("weight")} />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-sm text-muted-foreground">kg</span>
            </div>
            <FieldError errors={errors.weight ? [errors.weight] : []} />
          </Field>

          <DialogFooter className="gap-2 sm:gap-0">
            {existing && (
              <Button type="button" variant="ghost" size="sm" className="mr-auto text-destructive hover:text-destructive" onClick={handleDelete}>
                Remove
              </Button>
            )}
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" size="sm">
              {existing ? "Update" : "Log weight"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
