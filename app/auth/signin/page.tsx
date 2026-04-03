"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";

import { useForm, FormProvider } from "react-hook-form";
import { LoginSchema, LoginSchemaType } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Session } from "inspector/promises";


export default function SignInPage() {

  const [error,setError] =useState<string | null>(null);
  const {data: session}=useSession();
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginSchemaType) => {
    setError(null); 
  try{
     
   const result = await signIn("credentials",{
      email: data.email,
      password: data.password,
      redirect: false,
    });
  if (result?.error) {
  if (result.error === "CredentialsSignin") {
    toast.error("Invalid email or password");
  } else {
    toast.error("Something went wrong");
  }
}
  }catch(error){
    console.error("Sign in error",error);
    setError("An error occured while signing in")
  }
    // console.log(result);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md rounded-2xl p-6 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">Login to your account</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
         
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              
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

              {session?.user && (
                <pre>{JSON.stringify(session,null,2)}</pre>
              )}
              <Button type="submit" className="w-full bg-primary">
                LOGIN
              </Button>
            </form>
          </FormProvider>

          <div className="text-center text-sm text-muted-foreground">Or, login with</div>

          <div className="flex justify-center gap-4">
            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-black transition">
              <Image src="/goggle.svg" alt="Google" width={18} height={18} />
              Google
            </button>

            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-black transition">
              <Image src="/facebook.svg" alt="Facebook" width={19} height={19} />
              Facebook
            </button>
          </div>
        </CardContent>

        <CardFooter className="justify-center text-sm">
          Don’t have an account?
          <Link href="/auth/signup" className="ml-1 text-primary hover:underline">
            Sign up
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}