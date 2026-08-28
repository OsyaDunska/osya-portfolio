import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The phone mockups are near-black gradients, where the default WebP
    // quality of 75 bands visibly — it was crushing a 900KB PNG to 42KB.
    qualities: [75, 95],
  },
};

export default nextConfig;
