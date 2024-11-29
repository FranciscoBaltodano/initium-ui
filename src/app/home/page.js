'use client';

import { Loader } from '@/components/ui/loader';
import { useUser } from '@/context/userContext';
import { GetUserInfo } from '@/services/users';
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import moment from 'moment';

export default function Home() {
  const { user, updateUser } = useUser();
  const [difference, setDifference] = useState();
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter();

  const formatTimeDifference = (startDate, endDate) => {
    const momentStart = moment(startDate);
    const momentEnd = moment(endDate);
  
    const months = momentStart.diff(momentEnd, "months");
    if (months > 0) return `${months} months since account activation`;
  
    const days = momentStart.diff(momentEnd, "days");
    if (days > 0) return `${days} days since account activation`;
  
    const hours = momentStart.diff(momentEnd, "hours");
    if (hours > 0) return `${hours} hours since account activation`;
  
    const minutes = momentStart.diff(momentEnd, "minutes");
    if (minutes > 0) return `${minutes} minutes since account activation`;
  
    return "No hay diferencia";
  };

  useEffect(() => {
    const fetchUserTime = async () => {
      try {
        const userData = await GetUserInfo(localStorage.getItem("userToken"));
        updateUser(userData);
        
        const activationDate = new Date(userData.updated_at);
        const currentDate = new Date();
        const difference = formatTimeDifference(activationDate, currentDate);
        setDifference(difference);
      } catch (error) {
        if (error.status === 401) {
          router.push("/login");
        } else {
          console.error("Error fetching user info:", error);
        }
      } finally {
        setIsLoading(false)
      }
    };

    fetchUserTime();
  }, [router, updateUser]);

  if (isLoading) return(<Loader/>)
  if (!user) { return <div>Please log in</div> }

  return (
    <div className="h-screen flex items-center justify-center">
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Welcome {user?.firstname} {user?.lastname}
        <br />
        <p className="text-2xl">{difference}</p>
      </motion.h1>
    </div>
  );
}