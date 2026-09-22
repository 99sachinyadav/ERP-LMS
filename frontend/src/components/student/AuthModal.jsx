import React, { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const AuthModal = ({ onClose }) => {
  const { login, register } = useContext(AppContext);
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const updateForm = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const data =
        mode === "login"
          ? await login(form.email, form.password)
          : await register(form.name, form.email, form.password);

      if (data.success) {
        onClose();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-y-auto bg-slate-950/70 px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="relative z-[10000] w-full max-w-[420px] shrink-0 rounded-lg bg-white p-5 shadow-2xl sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-2xl font-semibold leading-tight text-slate-900">
              {mode === "login" ? "Welcome back" : "Create your account"}
            </h2>
            <p className="mt-1 text-sm leading-5 text-slate-500">
              {mode === "login"
                ? "Login to enroll in courses and continue learning."
                : "Register once and enroll in any course for free."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-2xl leading-none text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close auth form"
          >
            &times;
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {mode === "register" && (
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Full name</span>
              <input
                name="name"
                value={form.name}
                onChange={updateForm}
                placeholder="Enter your full name"
                className="h-11 w-full min-w-0 rounded border border-slate-300 px-3 text-sm outline-blue-500"
                required
              />
            </label>
          )}
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">Email</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={updateForm}
              placeholder="you@example.com"
              className="h-11 w-full min-w-0 rounded border border-slate-300 px-3 text-sm outline-blue-500"
              required
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">Password</span>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={updateForm}
              placeholder="At least 6 characters"
              minLength={6}
              className="h-11 w-full min-w-0 rounded border border-slate-300 px-3 text-sm outline-blue-500"
              required
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 h-11 w-full rounded bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}
        </button>

        <div className="mt-5 text-center text-sm text-slate-600">
          {mode === "login" ? "New here?" : "Already have an account?"}
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="ml-1 font-medium text-blue-600 hover:text-blue-700"
          >
            {mode === "login" ? "Create an account" : "Login"}
          </button>
        </div>
      </form>
    </div>,
    document.body,
  );
};

export default AuthModal;
