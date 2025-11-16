"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GlobalGSAPFix() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Mobile safe refresh
    setTimeout(() => {
      ScrollTrigger.refresh();
      window.dispatchEvent(new Event("resize"));
    }, 600);
  }, []);

  return null;
}
