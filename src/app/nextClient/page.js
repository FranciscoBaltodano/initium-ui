'use client';

import { NextCard } from "@/components/card/NextCard";
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

    </div>
  );
}
