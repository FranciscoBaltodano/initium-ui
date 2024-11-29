"use client";  

import { Loader } from "@/components/ui/loader";
import Navbar from "@/components/ui/navbar";
import { useUser } from "@/context/userContext";  
import { useRouter } from "next/navigation";  
import { useEffect, useState } from "react";

export default function HomeLayout({ children }) {
  const { user } = useUser();  
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
      if (!user) {
        router.push("/404"); 
      } else {
        setIsLoading(true); 
      }
  }, [user, router]);

  if (!isLoading) return(<Loader />)

  return (
    <>
        <Navbar isProtected />
        {children}
    </>
  );
}

