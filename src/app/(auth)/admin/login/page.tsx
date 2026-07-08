"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const email = fd.get("email") as string;
    const password = fd.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/admin/blogs",
      });

      if (result?.error) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      window.location.href = result?.url ?? "/admin/blogs";
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-8 w-full max-w-sm space-y-5"
      >
        <div className="text-center mb-2">
          <h1 className="text-xl font-bold">Admin Login</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Prime Fitness Dashboard
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-md px-3 py-2 text-center">
            {error}
          </div>
        )}

        <div className="space-y-1">
          <label className="text-sm font-medium">Email</label>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="admin@example.com"
            className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Password</label>
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-sky-500 hover:bg-sky-600 text-white rounded-md py-2 text-sm font-medium transition disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
