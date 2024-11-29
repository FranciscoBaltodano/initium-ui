"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { Loader2 } from "lucide-react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ActivateUser } from "@/services/users";
import { useRouter } from "next/navigation";

export function CodeForm() {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = React.useState("");
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    
    if (code.length < 6) {
      setErrorMessage("Please fill all the fields");
      setIsLoading(false);    
      return;
    }
    console.log(code);
    
    try {
      const response = await ActivateUser(code); 
      console.log('Response: ', response);
      const token = localStorage.getItem('userToken');
      console.log(token);
      
      router.push('/login')
    } catch (error) {
      console.error("Error:", error.status);
      switch (error.status) {
        case 422:
          setErrorMessage("Missing required fields");
          break;
        case 404:
          setErrorMessage("Invalid code.");
          break;
        case 401:
          setErrorMessage("Expired session. Please login again.");
          break;
        case 400:
          setErrorMessage("Expired code. We send a new one.");
          break;
        default:
          setErrorMessage("Something went wrong. Please try again later.");
          break;
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
      className="max-w-md text-center w-full mx-auto rounded-none sm:rounded-2xl p-4 md:p-8 sm:shadow-input sm:bg-white/50 sm:bg-none bg-transparent mt-20 sm:dark:bg-black/50">
      
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Activate your account
      </h2>
      <p className="text-neutral-600 text-sm mt-2 dark:text-neutral-300">
        Please enter the code you received in your email.
      </p>

      <form 
        onSubmit={onSubmit}
        className="my-4 flex flex-col items-center gap-2 justify-center"
        >
      
        <InputOTP
            value={code}
            onChange={(code) => setCode(code)}
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
        >
            <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
            </InputOTPGroup>
        </InputOTP>

        <div className="text-center text-sm">
            {code === "" ? (
            <>Enter your one-time password.</>
            ) : (
            <>You entered: {code}</>
            )}
        </div>

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
                : 'Activate'
            }
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

