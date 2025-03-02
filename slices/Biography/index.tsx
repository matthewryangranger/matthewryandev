"use client";
import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import Avatar from "./Avatar";

/**
 * Props for `Biography`.
 */
export type BiographyProps = SliceComponentProps<Content.BiographySlice>;

/**
 * Component for "Biography" Slices.
 */
const Biography: FC<BiographyProps> = ({ slice }) => {

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid gap-x-8 gap-y-6 md:grid-cols-[2fr, 1fr]">
        <Heading as="h1" size="lg" className="about-me text-stone-400 col-start-1">
          {slice.primary.heading}
        </Heading>
        <div className="prose prose-xl prose-slate prose-invert col-start-1 text-3xl text-zinc-500">
          <PrismicRichText field={slice.primary.biography_paragraph} />
        </div>

        <Avatar image={slice.primary.avatar} className="row-start-1 mt-7 md:col-start-2 md:row-end-3" />
      </div>
    </Bounded>
  );
};

export default Biography;
