import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import PlayerProvider from "@/components/PlayerProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: "Resonance — Type a feeling, hear it alive",
  description:
    "An emotion-aware AI music studio. Resonance reads the feeling in your words and composes original soundtracks with Google Gemini and Lyria.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${grotesk.variable} grain min-h-screen bg-ink font-body text-white antialiased`}
      >
        <PlayerProvider>{children}</PlayerProvider>
      </body>
    </html>
  );
}
