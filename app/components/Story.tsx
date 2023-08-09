import React from "react";
import EmblaCarousel from "./EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel-react";

import "../css/embla.css";
const OPTIONS: EmblaOptionsType = { dragFree: true, containScroll: "trimSnaps" };
const SLIDE_COUNT = 16;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const Story = () => {
  return (
    <main>
      <section className="">
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </section>
    </main>
  );
};

export default Story;
