'use client';

import { NextCard } from "@/components/card/NextCard";
import { ModeToggle } from "@/components/theme/ModeToggle";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { GetCard } from "@/services/nextcard";
import { useEffect, useState } from "react";

export default function Home() {

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    GetCard().then((data) => {
      setCards(data);
      setLoading(false);
    });

  }, [])
  

  return (
    <div className="flex flex-col min-h-screen w-full p-10">


      <NextCard
        id='new'
        title='Create a new card'
        description=''
      />

      {loading && 
        (
          <p>Loading...</p>
        )
      } 

      {cards.map((card) => (
        <NextCard
          key={card.id}
          id={card.id}
          title={card.title}
          description={card.description}
        />
      ))}

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
              <ModeToggle />
              <InputOTP maxLength={6}>
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
              <Button>Hola mundo</Button>
            </main>

    </div>
  );
}
