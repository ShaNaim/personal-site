import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormData = z.infer<typeof schema>;

export function ExampleForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Form data:", data);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <div className="flex flex-col gap-1">
        <input {...register("email")} type="email" placeholder="Email" className="border rounded px-3 py-2 text-sm" />
        {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <input {...register("password")} type="password" placeholder="Password" className="border rounded px-3 py-2 text-sm" />
        {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
      </div>

      <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
        Submit
      </Button>
    </div>
  );
}
