"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import personalInfo from "../../config/personal-info";
import About from "../../components/About";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-6xl">
      <About />
    </div>
  );
}
