import "./globals.css";
import type { Metadata } from "next";
import { PrismicPreview } from "@prismicio/next";
import { createClient, repositoryName } from "@/prismicio";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return {
    title: settings.data.meta_title,
    description: settings.data.meta_description
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-stone-950">
      <body className="relative min-h-screen">
        <Header />
        {children}
        <div className="background-gradient absolute inset-0 -z-50 max-h-screen" />
        <Footer />
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}