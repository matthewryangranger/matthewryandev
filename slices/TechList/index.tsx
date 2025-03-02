import React, { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";

/**
 * Props for `TechList`.
 */
export type TechListProps = SliceComponentProps<Content.TechListSlice>;

/**
 * Component for "TechList" Slices.
 */
const TechList: FC<TechListProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading size="md" as="h2" className="text-slate-700">
        {slice.primary.heading}
      </Heading>
      {slice.primary.tech_list_group.map(({ tech_color, tech_name }, index) => (
        <div key={index}>
          {Array.from({ length: 15 }, (_, index) => (
            <React.Fragment key={index}>
              <span className="tech-item">{tech_name}</span>
            </React.Fragment>
          ))}
        </div>
      ))}
    </section>
  );
};

export default TechList;
