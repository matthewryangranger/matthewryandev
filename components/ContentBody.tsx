import { isFilled, DateField, Content } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";


export default function ContentBody({ page }: {
    page: Content.BlogPostDocument | Content.ProjectDocument;
}) {

    function formatDate(date: DateField) {
        if (isFilled.date(date)) {


            const dateOptions: Intl.DateTimeFormatOptions = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            };

            return new Intl.DateTimeFormat("en-US", dateOptions).format(new Date(date));
        }
    }

    const formattedDate = formatDate(page.data.date);

    return (

        <Bounded as="section">
            <div className="rounded-sm px-4">
                <Heading as="h1" size="md" className="text-stone-400">{page.data.title}</Heading>
                <div className="flex gap-4 mx-1 mt-3 text-stone-400 text-xl font-bold">
                    {page.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                    ))}
                </div>
                <p className="mt-8 border-b border-stone-600 text-xl font-medium text-stone-400">{formattedDate}</p>
                <div className="prose prose-lg prose-invert mt-12 w-full max-w-none md:mt-20">
                    <SliceZone slices={page.data.slices} components={components} />
                </div>
            </div>
        </Bounded>

    );
}
