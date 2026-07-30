"use client";

import { useState } from "react";
import { login } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import type { LoginFormValues } from "../schema/login.schema";

export function useLogin() {
  const { setAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(values: LoginFormValues) {
    setLoading(true);
    setError("");
    try {
      const res = await login(values);
      const { access_token, id, email, name } = res.data;
      setAuth({ id, email, name }, access_token);
      // Navigation will be handled by useEffect in LoginForm after token is set
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login gagal");
    } finally {
      setLoading(false);
    }
  }

  return { submit, loading, error };
}
