"use client";
import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { set, useForm } from "react-hook-form";
import { LoginUser, Register } from "@/services/users";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useUser } from "@/context/userContext";
const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
const passwordRegex = /[A-Z]/;
const specialCharRegex = /[\W_]/; 
const sequenceRegex = /(012|123|234|345|456|567|678|789|890)/; 

export function AuthForm({isLogin=true}) {

  const { register, watch, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const { updateUser} = useUser();
  
  const password = watch("password"); 

  useEffect(() => {
    localStorage.removeItem('userToken');
  }, []);

  const onSubmit = async (data) => {
    try {
      if (isLogin) {
        onLoginSubmit(data);
      } else {
        onSignUpSubmit(data);
      }
    } catch (error) {
        console.error("Error:", error);
        setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  const onLoginSubmit = async (data) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await LoginUser(data);
      const token = response.idToken;
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      updateUser(decodedToken);
      
      localStorage.setItem("userToken", token);
  
      if (decodedToken.active) {
        setTimeout(() => {
          router.push("/home");
        }, 100); 
      } else {
        router.push("/activate");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.status === 422) {
        setErrorMessage("Invalid email or password");
      } else {
        setErrorMessage("Invalid login credentials");
      }
    } finally {
      setIsLoading(false);
    }
  };
  

  const onSignUpSubmit = async (data) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await Register(data);
      console.log(response);
      router.push('/login')
    } catch (error) {
      console.error("Error:", error);
      if (error.status === 409) {
        setErrorMessage("Email already registered");
      } else {
        setErrorMessage("Something went wrong. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  }



  return (
    (<motion.div
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="max-w-md  w-full mx-auto rounded-none sm:rounded-2xl p-4 md:p-8 sm:shadow-input sm:bg-white/50 sm:bg-none bg-transparent mt-20 sm:dark:bg-black/50">
      
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        {isLogin ? "Login" : "Sign Up"} to INITIUM
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to make stunning cards for every occasion.
      </p>
        
      <div className=" bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        
      <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
        {!isLogin &&
          <div
            className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name</Label>
              <Input
                id="firstname"
                placeholder="Tyler"
                type="text"
                {...register("firstname", {
                  required: "First name is required",
                  minLength: { value: 2, message: "First name must be at least 2 characters" },
                  maxLength: { value: 50, message: "First name must be at most 50 characters" },
                  pattern: {
                    value: nameRegex,
                    message: "First name can only contain letters and spaces",
                  },
                })}
              />
              {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname.message}</p>}
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last name</Label>
              <Input
                id="lastname"
                placeholder="Durden"
                type="text"
                {...register("lastname", {
                  required: "Last name is required",
                  minLength: { value: 2, message: "Last name must be at least 2 characters" },
                  maxLength: { value: 50, message: "Last name must be at most 50 characters" },
                  pattern: {
                    value: nameRegex,
                    message: "Last name can only contain letters and spaces",
                  },
                })}
              />
              {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname.message}</p>}
            </LabelInputContainer>
          </div>
        }
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            {...register("email", {
              required: "Email is required",
            })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            {...register("password", {
              required: "Password is required",

              minLength: !isLogin && { value: 6,   message: "Password must be at least 6 characters" },
              maxLength: !isLogin && { value: 200, message: "Password must be at most 200 characters" },
              validate:  !isLogin && {
                uppercase: (value) =>
                  passwordRegex.test(value)    || "Password must contain at least one uppercase letter",
                specialChar: (value) =>
                  specialCharRegex.test(value) || "Password must contain at least one special character",
                noSequence: (value) =>
                  !sequenceRegex.test(value)   || "Password must not contain a sequence of numbers",
              }
            })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </LabelInputContainer>

        {!isLogin && (
          <LabelInputContainer className="mb-8">
            <Label htmlFor="confirmPassword">Confirm your password</Label>
            <Input
              id="confirmPassword"
              placeholder="••••••••"
              type="password"
              {...register("confirmPassword", {
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </LabelInputContainer>
        )}

        <div className=" bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          disabled={isLoading}>
          {isLoading ? 
            (
              <div className="flex justify-center gap-4">
                <Loader2 className="animate-spin" />
                Please wait
              </div>
            )
            : isLogin ? "Login" : "Register"
          }
          <BottomGradient />
        </button>
       
      </form>
      {errorMessage && (
        <h2 className="font-bold text-md text-center py-4 my-4 bg-red-600/80 shadow-lg rounded-lg text-white">
          {errorMessage}
        </h2>
      )}
    </motion.div>)
  );
}

const BottomGradient = () => {
  return (<>
    <span
      className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span
      className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>);
};

const LabelInputContainer = ({
  children,
  className
}) => {
  return (
    (<div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>)
  );
};
