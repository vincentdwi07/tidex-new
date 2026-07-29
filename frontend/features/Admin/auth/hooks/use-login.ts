"use client";

import { useState } from "react";
import { login } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import type { LoginFormValues } from "../schema/login.schema";

export function useLogin(onSuccess: () => void) {
  const { setAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(values: LoginFormValues) {
    setLoading(true);
    setError("");
    try {
      const res = await login(values);
      setAuth(res.data.user, res.data.token);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login gagal");
    } finally {
      setLoading(false);
    }
  }

  return { submit, loading, error };
}
