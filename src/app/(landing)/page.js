"use client";
 
import { motion } from "framer-motion";
import React from "react";


import { AuroraBackground } from "@/components/ui/aurora-background";

import { HeroParallax } from "@/components/ui/hero-parallax";
import Navbar from "@/components/ui/navbar";
import { GitCompare } from "lucide-react";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroParallax />
    </>
  );
}
