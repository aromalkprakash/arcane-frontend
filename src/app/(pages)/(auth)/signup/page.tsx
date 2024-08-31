"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { FormEvent } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { z } from "zod";
import "../../../../styles/signup.scss";
import GoogleLoginButton from "@/assets/GoogleLogin";
import { BsGoogle } from "react-icons/bs";
import { signupUser } from "@/api/userUrl";

const signUpSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});


const SignUpForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (event: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const signup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const result = await signUpSchema.parseAsync(formData);
      const response = await signupUser(result);

      if (response.status === 201) {
        toast.success('Registered Successfully');
        router.push("/")
      } else  {
        toast.error('something wrong');
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
      <div className="signup-page">
        <div className="mb-[40px]">
          <h1 className="signup-h1">Create your Account</h1>
          <img src="/shining.jpg" alt="shining" className="signup-image" />
        </div>
        <div className="signup-items">
          <form onSubmit={signup} className="flex flex-col gap-4">
            <input type="text" placeholder="Full Name" name="fullName" className="signup-input" value={formData.fullName} onChange={handleChange} />
            <input type="text" placeholder="Username" name="username" className="signup-input" value={formData.username} onChange={handleChange} />
            <input type="email" placeholder="Email" name="email" className="signup-input" value={formData.email} onChange={handleChange} />
            <input type="password" placeholder="Password" name="password" className="signup-input" value={formData.password} onChange={handleChange} />
            <button type="submit" disabled={isLoading} className="signup-btn">
              {isLoading ? 'Signing Up...' : 'Sign Up'}
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
              <Link href="/login" className="to-login">Already have an account? Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;


