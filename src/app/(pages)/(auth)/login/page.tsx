"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import GoogleLoginButton from "@/assets/GoogleLogin";
import { loginUser } from "@/api/userUrl";
import { z } from "zod";
import "../../../../styles/login.scss";
import { BsGoogle } from "react-icons/bs";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const result = await loginSchema.parseAsync(formData);
      const response = await loginUser(result);
      if (response.status === 200) {
        toast.success("Logged In");
        router.push("/");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        setError(error.issues[0].message);
      } else {
        setError(error.message || "Something went wrong");
      }
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="login-page">
        <div className="mb-[25px]">
          <h1 className="login-h1">Login</h1>
          <img src="/shining.jpg" alt="shining" className="login-image" />
        </div>
        <div className="login-items">
          <form onSubmit={login} className="flex flex-col gap-4">
            <label htmlFor="Username" className="labels">Username</label>
            <input
              type="username"
              placeholder="username"
              name="username"
              onChange={handleChange}
              className="login-input"
            />
            <label htmlFor="Password" className="labels">Password</label>
            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={handleChange}
              className="login-input"
            />
            <button type="submit" disabled={isLoading} className="login-btn">
              {isLoading ? "Login..." : "Login"}
            </button>
          </form>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <div className="google-and-all">
            <div>
              <h1 className="text-black">Or</h1>
            </div>
            <div className="google">
              <BsGoogle color="black" />
              <GoogleLoginButton />
            </div>
            <div>
              <Link href="/signup" className="to-signup">Don't have an account? Signup</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;