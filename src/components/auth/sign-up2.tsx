/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {signUp} from "@/lib/auth-client";
import {zodResolver} from "@hookform/resolvers/zod";
import {Loader2, X} from "lucide-react";
import Image from "next/image";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {toast} from "sonner";
import {z} from "zod";

// 1. Zod schema for form validation
const signUpSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    passwordConfirmation: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 2. Setup react-hook-form with zod
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  // 3. Handle form submit
  const onSubmit = async (data: SignUpFormValues) => {
    setLoading(true);
    try {
      await signUp.email({
        email: data.email,
        password: data.password,
        name: `${data.firstName} ${data.lastName}`,
        image: image ? await convertImageToBase64(image) : "",
        callbackURL: "/auth",
        fetchOptions: {
          onResponse: () => setLoading(false),
          onRequest: () => setLoading(true),
          onError: (ctx) => {
            toast.error(ctx.error.message);
            setLoading(false);
          },
          onSuccess: async () => {
            toast.success("Account created successfully!");
            reset();
            setImage(null);
            setImagePreview(null);
            setLoading(false);
          },
        },
      });
    } catch (error: any) {
      toast.error(error.message || "Something went wrong.");
      setLoading(false);
    }
  };

  // 4. Image change handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="max-w-md rounded-none shadow-sm dark:bg-transparent backdrop-blur-[2px]">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Register</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4 items-start">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  placeholder="Thomas"
                  {...register("firstName")}
                  autoComplete="given-name"
                />
                {errors.firstName && (
                  <span className="text-red-500 text-xs">
                    {errors.firstName.message}
                  </span>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  placeholder="Anderson"
                  {...register("lastName")}
                  autoComplete="family-name"
                />
                {errors.lastName && (
                  <span className="text-red-500 text-xs">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                autoComplete="email"
              />
              {errors.email && (
                <span className="text-red-500 text-xs">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                autoComplete="new-password"
                placeholder="Password"
              />
              {errors.password && (
                <span className="text-red-500 text-xs">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password_confirmation">Confirm Password</Label>
              <Input
                id="password_confirmation"
                type="password"
                {...register("passwordConfirmation")}
                autoComplete="new-password"
                placeholder="Confirm Password"
              />
              {errors.passwordConfirmation && (
                <span className="text-red-500 text-xs">
                  {errors.passwordConfirmation.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Profile Image (optional)</Label>
              <div className="flex items-end gap-4">
                {imagePreview && (
                  <div className="relative w-16 h-16 rounded-sm overflow-hidden">
                    <Image
                      src={imagePreview}
                      alt="Profile preview"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                )}
                <div className="flex items-center gap-2 w-full">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full"
                  />
                  {imagePreview && (
                    <X
                      className="cursor-pointer"
                      onClick={() => {
                        setImage(null);
                        setImagePreview(null);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                "Create an account"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

// Image conversion helper
async function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
