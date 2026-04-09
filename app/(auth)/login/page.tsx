import type { Metadata } from "next";
import { APP_NAME } from "@/lib/consts";
import { LoginForm } from "@/components/forms/login-form";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <div className="w-full max-w-md rounded-lg bg-card p-8">
      <h1 className="font-heading text-2xl font-semibold">Welcome Back</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Sign in to manage {APP_NAME}.
      </p>

      <div className="mt-8">
        <LoginForm />
      </div>
    </div>
  );
}
