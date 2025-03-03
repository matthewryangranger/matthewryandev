import clsx from "clsx";
import React from "react";
import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import Bounded from "@/components/Bounded";
import { isFilled } from "@prismicio/client";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

export default async function Footer() {
    const client = createClient();
    const settings = await client.getSingle("settings");
    return (
        <Bounded as="section" className="text-stone-600">
            <div className="container mx-auto mt-20 flex flex-col items-center justify-between gap-6 py-8 sm:flex-row text-center content-center">
                <div className="name flex flex-col items-center justify-center gap-x-4 gap-y-2 sm:flex-row sm:justify-self-start">
                    <Link
                        href="/"
                        className="text-xl font-extrabold tracking-tighter text-stone-100 transition-colors duration-150 hover:text-stone-400 mt-0.5"
                    >
                        {settings.data.name}
                    </Link>
                    <span
                        className="hidden text-3xl font-extralight leading-[0] text-stone-400 sm:inline"
                        aria-hidden={true}
                    >
                        /
                    </span>
                    <p className="text-base text-stone-300 mt-1">
                        © {new Date().getFullYear()} {settings.data.name}
                    </p>
                </div>
                <nav className="navigation" aria-label="Footer Navigation">
                    <ul className="flex items-center gap-1">
                        {settings.data.nav_item.map(({ link, label }, index) => (
                            <React.Fragment key={label}>
                                <li>
                                    <PrismicNextLink
                                        className={clsx(
                                            "content-center group relative block overflow-hidden  rounded px-3 py-1 text-base font-bold text-stone-100 transition-colors duration-150 hover:hover:text-stone-400",
                                        )}
                                        field={link}
                                    >
                                        {label}
                                    </PrismicNextLink>
                                </li>
                                {index < settings.data.nav_item.length - 1 && (
                                    <span
                                        className="content-center text-3xl font-thin leading-[0] text-stone-400"
                                        aria-hidden="true"
                                    >
                                        /
                                    </span>
                                )}
                            </React.Fragment>
                        ))}
                    </ul>
                </nav>
                <div className="socials inline-flex justify-center sm:justify-end">
                    {isFilled.link(settings.data.github_link) && (
                        <PrismicNextLink
                            field={settings.data.github_link}
                            className="p-2 text-2xl text-stone-300 transition-all duration-150 hover:scale-125 hover:text-stone-500"
                            aria-label={settings.data.name + " on GitHub"}
                        >
                            <FaGithub />
                        </PrismicNextLink>
                    )}
                    {isFilled.link(settings.data.linkedin_link) && (
                        <PrismicNextLink
                            field={settings.data.linkedin_link}
                            className="p-2 text-2xl text-stone-300 transition-all duration-150 hover:scale-125 hover:text-stone-500"
                            aria-label={settings.data.name + " on LinkedIn"}
                        >
                            <FaLinkedin />
                        </PrismicNextLink>
                    )}
                </div>
            </div>
        </Bounded>
    );
}