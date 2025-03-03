"use client";
import React, { FC, useEffect, useRef } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import { MdCircle } from "react-icons/md";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";
import Bounded from "@/components/Bounded";

gsap.registerPlugin(ScrollTrigger);
/**
 * Props for `TechList`.
 */
export type TechListProps = SliceComponentProps<Content.TechListSlice>;

/**
 * Component for "TechList" Slices.
 */
const TechList: FC<TechListProps> = ({ slice }) => {

  const component = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: component.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 4
        }
      })

      tl.fromTo(
        ".tech-row", {
        x: (index) => {
          return index % 2 == 0 ? gsap.utils.random(600, 400) : gsap.utils.random(-600, -400);
        },
      }, {
        x: (index) => {
          return index % 2 == 0 ? gsap.utils.random(-600, -400) : gsap.utils.random(600, 400);
        },
        ease: "power1.inOut"
      }
      )
    }, component);
    return () => ctx.revert();
  });

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
    >
      <Bounded className="-mb-16 mt-5">
        <Heading size="md" as="h2" className="-mt-28 text-stone-400">
          {slice.primary.heading}
        </Heading>
      </Bounded>



      {slice.primary.tech_list_group.map(({ tech_color, tech_name }, index) => (
        <div key={index}
          className="tech-row mb-8 opacity-90 flex items-center justify-center gap-4 sepia text-stone-700"
          aria-label={tech_name || undefined}>
          {Array.from({ length: 16 }, (_, index) => (
            <React.Fragment key={index}>
              <span className="tech-item text-7xl font-extrabold uppercase tracking-tighter" style={{ color: index === 8 && tech_color ? tech_color : "inherit" }}>{tech_name}</span>
              <span className="text-3xl">
                <MdCircle />
              </span>
            </React.Fragment>
          ))}
        </div>
      ))}
    </section>
  );
};

export default TechList;
