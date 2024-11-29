/** @type {import('next').NextConfig} */
import { config } from 'dotenv';

const nextConfig = {
    env:{
      NEXT_PUBLIC_API_DOMAIN: process.env.NEXT_PUBLIC_API_DOMAIN,
    }
  };

export default nextConfig;

