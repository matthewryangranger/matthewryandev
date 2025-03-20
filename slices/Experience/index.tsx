import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { JSX } from "react";

/**
 * Props for `Experience`.
 */
export type ExperienceProps = SliceComponentProps<Content.ExperienceSlice>;

/**
 * Component for "Experience" Slices.
 */
const Experience = ({ slice }: ExperienceProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading as="h2" size="md" className="text-stone-400 -mt-3">
        {slice.primary.heading}
      </Heading>
      {slice.primary.zone.map((item, index) => (
        <div key={index} className="ml-6 mt-8 max-w-prose md:ml-12 md:mt-16">
          <Heading as="h3" size="sm" className="text-stone-400">
            {item.title}
          </Heading>

          <div className="mt-1 flex w-fit items-center gap-1 text-2xl font-semibold tracking-tight text-stone-400">
            <span>{item.date}</span>{" "}
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">{item.institution}</span>
          </div>

          <div className="mt-1 flex w-fit items-center gap-1 text-2xl font-semibold tracking-tight text-stone-400">
            <span className="inline md:hidden">{item.institution}</span>
          </div>


          <div className="prose prose-lg prose-invert text-stone-500 mt-4">
            <PrismicRichText field={item.description} />
          </div>
        </div>
      ))}
    </Bounded>
  );
};

export default Experience;