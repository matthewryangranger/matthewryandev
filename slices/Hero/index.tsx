"use client";
import { FC, useEffect, useRef } from "react";
import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { gsap } from "gsap";
import Bounded from "@/components/Bounded";
import Shapes from "./Shapes";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {

  const component = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {

      const tl = gsap.timeline();

      tl.fromTo(".name-animation", {
        x: -100, opacity: 0, rotate: -10
      },
        {
          x: 0, opacity: 1, rotate: 0, ease: "elastic.out(1, 0.3)", duration: 1, transformOrigin: "left top", stagger: { each: 0.1 }, delay: 0.6
        }
      )

      tl.fromTo(".job-title", { y: 20, opacity: 0, scale: 1.2 }, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        scale: 1,
        ease: "elastic.out(1, 0.3)"
      })
    }, component);
    return () => ctx.revert();

  }, []);

  const renderLetters = (name: KeyTextField, key: string) => {
    if (!name) return;
    return name.split("").map((letter, index) => (
      <span key={index} className={`name-animation name-animation-${key} inline-block opacity-0`}>
        {letter}
      </span>
    ))
  };

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
    >
      <div className="grid min-h-[70vh] grid-cols-1 items-center xl:grid-cols-2">
        <Shapes />
        <div className="col-start-1 xl:row-start-1 " data-speed=".2">
          <h1 className="mb-8 text-[clamp(3rem,20vmin,10rem)] font-extrabold leading-none tracking-wide" aria-label={slice.primary.first_name + " " + slice.primary.middle_name}>
            <span className="block text-stone-400 whitespace-nowrap">{renderLetters(slice.primary.first_name, "first")}</span>
            <span className="-mt-[.2em] block text-stone-400 whitespace-nowrap">{renderLetters(slice.primary.middle_name, "middle")}</span>
            <span className="-mt-[.2em] block text-stone-500 whitespace-nowrap">{renderLetters(slice.primary.last_name, "last")}</span>
          </h1>
          <span className="job-title block bg-gradient-to-tr from-stone-800 via-stone-700 to-stone-800 bg-clip-text text-2xl font-bold uppercase tracking-[.2em] text-transparent opacity-0 md:text-4xl"><>{slice.primary.career_tagline}</></span>
        </div>
      </div>
    </Bounded>



  );
};

export default Hero;