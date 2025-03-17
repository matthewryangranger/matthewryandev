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
    <div className="max-w-prose text-2xl prose-slate text-stone-500">
      <PrismicRichText field={slice.primary.text} ></PrismicRichText>
    </div>
  );
};

export default TextBlock;
