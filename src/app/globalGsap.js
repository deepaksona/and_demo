"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GlobalGSAPFix() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    setTimeout(() => {
      ScrollTrigger.refresh();
      window.dispatchEvent(new Event("resize"));
    }, 800);
  }, []);

  return null;
}
