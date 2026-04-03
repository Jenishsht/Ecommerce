"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";

import { useForm, FormProvider } from "react-hook-form";
import {RegisterSchema, RegisterSchemaType } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { registerUser } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [error,setError] =useState<string | null>(null);
  const router = useRouter();

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name:"",
      email: "",
      password: "",
      confirmPassword:"",
    },
  });



  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: RegisterSchemaType) => {
   setError(null);
   form.clearErrors();

   try{
    const result = await registerUser(data);
    if(!result?.success){
      setError(result?.error || "An error occurred  while creating your account.");
      return;
    }
    router.push("/auth/signin")
   }catch(e){
    console.error("Registration Error:",e);
    setError("An error occured while creating your account.");
   }
   
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md rounded-2xl p-6 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">Create your account</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
         
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2 relative">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                      />
                    </FormControl>

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-9 text-muted-foreground"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="space-y-2 relative">
                    <FormLabel>confirmPassword</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                      />
                    </FormControl>

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-9 text-muted-foreground"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <div className="text-red-500">{error}</div>}

              <Button type="submit" className="w-full bg-primary" disabled={form.formState.isSubmitting}>
                SIGN UP
              </Button>
            </form>
          </FormProvider>
        </CardContent>

        <CardFooter className="justify-center text-sm">
          Already have an account?
          <Link href="/auth/signin" className="ml-1 text-primary hover:underline">
            Sign in
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}