"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FormFieldWrapper } from "@/components/FormFieldWrapper";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import { FormSuccess } from "@/components/FormSuccess";
import { FormError } from "@/components/FormError";

export const loginFormSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values).then((res) => {
        setSuccess(res.success);
        setError(res.error);
      });
    });
  }

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div>
      <Card className="max-w-xl mx-auto">
        <CardHeader className="items-center">
          <CardTitle className="text-3xl">Welcome back</CardTitle>
          <CardDescription className="text-lg">Login to VChess</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormFieldWrapper
                fieldName="email"
                displayName="email or username"
                form={form}
                disabled={isPending}
              ></FormFieldWrapper>
              <FormFieldWrapper
                fieldName="password"
                form={form}
                disabled={isPending}
              />
              <FormDescription className="w-full flex justify-between">
                <span>Don't have account?</span>
                <span>
                  <a href="/register">Register</a>
                </span>
              </FormDescription>
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isPending}
              >
                Login
              </Button>
              <FormSuccess message={success} />
              <FormError message={error} />
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="w-full flex gap-2">
            <Button variant={"outline"} size={"lg"} className="w-full">
              <FaGithub className="h-5 w-5" />
            </Button>
            <Button variant={"outline"} size={"lg"} className="w-full">
              <FcGoogle className="h-5 w-5" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
