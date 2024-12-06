"use client";
import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { GitCompare } from "lucide-react";

export const cards = [
  {
    title: "FastAPI",
    link: "",
    thumbnail:
      "/landing/fastapi.png",
  },
  {
    title: "Aceternity",
    link: "",
    thumbnail:
      "/landing/aceternity.png",
  },
  {
    title: "Azure",
    link: "",
    thumbnail:
      "/landing/azure.png",
  },
 
  {
    title: "NextJS",
    link: "",
    thumbnail:
      "/landing/nextjs.png",
  },
  {
    title: "AzureFunctions",
    link: "",
    thumbnail:
      "/landing/azurefunctions.png",
  },
  {
    title: "Chocolatey",
    link: "",
    thumbnail:
      "/landing/chocolatey.png",
  },
 
  {
    title: "SendGrid",
    link: "",
    thumbnail:
      "/landing/sendgrid.png",
  },
  {
    title: "Shadcn",
    link: "",
    thumbnail:
      "/landing/shadcn.png",
  },
  {
    title: "Terraform",
    link: "",
    thumbnail:
      "/landing/terraform.png",
  },
  {
    title: "FastAPI",
    link: "",
    thumbnail:
      "/landing/fastapi.png",
  },
  {
    title: "Aceternity",
    link: "",
    thumbnail:
      "/landing/aceternity.png",
  },
  {
    title: "Azure",
    link: "",
    thumbnail:
      "/landing/azure.png",
  },
 
  {
    title: "NextJS",
    link: "",
    thumbnail:
      "/landing/nextjs.png",
  },
  {
    title: "AzureFunctions",
    link: "",
    thumbnail:
      "/landing/azurefunctions.png",
  },
  {
    title: "Chocolatey",
    link: "",
    thumbnail:
      "/landing/chocolatey.png",
  },
 
  {
    title: "SendGrid",
    link: "",
    thumbnail:
      "/landing/sendgrid.png",
  },
  {
    title: "Shadcn",
    link: "",
    thumbnail:
      "/landing/shadcn.png",
  },
  {
    title: "Terraform",
    link: "",
    thumbnail:
      "/landing/terraform.png",
  }
];

export const HeroParallax = () => {
  const products = cards;
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]), springConfig);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1000]), springConfig);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-700, 500]), springConfig);
  return (
    (<div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden  antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]">
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="">
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row  mb-20 space-x-20 ">
          {secondRow.map((product) => (
            <ProductCard product={product} translate={translateXReverse} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
      </motion.div>
    </div>)
  );
};

export const Header = () => {
  return (
    <motion.div
    initial={{ opacity: 0.0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{
      delay: 0.3,
      duration: 0.8,
      ease: "easeInOut",
    }}
    className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0"
  >
     <h1 className="text-5xl md:text-7xl font-bold dark:text-white">
          <div className="flex md:text-9xl items-center m-0">
            INITIUM
            <GitCompare className="inline-block size-24 md:ml-10 md:size-40" />
          </div>
           The web for stunning events.
       </h1>
       <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
         Make events for every occasion. 
         Your events are designed to live forever,
         combining modern aesthetics with user-focused functionality.  
         We ensure each event is not only visually striking but also secure.
       </p>
  </motion.div>
  );
};

export const ProductCard = ({
  product,
  translate
}) => {
  return (
    (<motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative flex-shrink-0">
      <Link href={product.link} className="block group-hover/product:shadow-2xl ">
        <Image
          src={product.thumbnail}
          height="500"
          width="500"
          className="object-fill object-left-top absolute h-full w-full inset-0"
          alt={product.title} />
      </Link>
      <div
        className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2
        className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>)
  );
};
