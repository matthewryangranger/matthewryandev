import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `TextBlock`.
 */
export type TextBlockProps = SliceComponentProps<Content.TextBlockSlice>;

/**
 * Component for "TextBlock" Slices.
 */
const TextBlock: FC<TextBlockProps> = ({ slice }) => {
  return (
    <div className="prose-stone prose-headings:text-stone-300 prose-p:text-stone-300 prose-a:text-slate-50">
      <PrismicRichText field={slice.primary.text} ></PrismicRichText>
    </div>
  );
};

export default TextBlock;
