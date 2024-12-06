'use client';

import { getCategories } from '@/services/users';
import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
      fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
        const data = await getCategories(localStorage.getItem("userToken"));
        setCategories(data);
        } catch (error) {
        console.error("Error fetching categories:", error);
        }
    };

  return (
    <div className="relative p-6">
    <h1 className="text-2xl font-bold  mb-6 text-center">
      Categories
    </h1>
    <Carousel className="relative p-6">
      <CarouselContent className="flex gap-4">
        {categories.map((category) => (
          <CarouselItem
            key={category.id}
            className="bg-slate-500/10 basis-1/2 md:basis-1/3 lg:basis-1/5  p-4 text-center rounded-lg shadow-md transition transform hover:scale-105 w-48"
          >
            <h2 className="text-lg font-semibold mb-1">{category.name}</h2>
            <p className="text-sm text-gray-500">{category.description}</p>
          </CarouselItem>

        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-700/80 text-white p-2 rounded-full shadow-md hover:bg-gray-800 transition">
        <span className="material-icons">chevron_left</span>
      </CarouselPrevious>
      <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-700/80 text-white p-2 rounded-full shadow-md hover:bg-gray-800 transition">
        <span className="material-icons">chevron_right</span>
      </CarouselNext>
    </Carousel>
  </div>
  );
}