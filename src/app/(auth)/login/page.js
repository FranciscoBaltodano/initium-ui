'use client';
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { LoginUser } from "@/services/users";
import { LoginFormValidater } from "@/utils/utils";

import { AuthForm } from "@/components/auth/auth-form";
import Navbar from "@/components/ui/navbar";

export default function page () {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <AuthForm isLogin />
      </div>
    </>
  )
}








