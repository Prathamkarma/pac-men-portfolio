import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PAC-Men | Navigating the AI Maze",
  description:
    "We are PAC-Men — a team of ambitious student developers passionate about AI, software engineering, problem solving, and open-source collaboration. Summer of AI Internship.",
  keywords: [
    "PAC-Men",
    "AI",
    "Machine Learning",
    "Team Portfolio",
    "Summer of AI",
    "BITS Pilani",
    "Open Source",
  ],
  authors: [
    { name: "Pratham Karma" },
    { name: "Amitesh Garg" },
    { name: "Chaitanya Chalith" },
  ],
  openGraph: {
    title: "PAC-Men | Navigating the AI Maze",
    description:
      "Ambitious student developers navigating the evolving maze of AI, software engineering, and open-source innovation.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-bg-primary text-text-primary font-sans">
        {children}
      </body>
    </html>
  );
}
