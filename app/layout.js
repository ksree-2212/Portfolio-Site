import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ParticleGrid from "@/components/ParticleGrid";
import ScrollProgress from "@/components/ScrollProgress";
import DetectionCursor from "@/components/DetectionCursor";
import ThemeProvider, { themeInitScript } from "@/components/ThemeProvider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
});

export const metadata = {
  title: "Sreeshanth Konda — AI & Computer Vision Engineer",
  description:
    "Portfolio of Sreeshanth Konda — AI & Data Science engineer specializing in computer vision, deep learning, and secure AI systems.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Applies the saved theme before paint to prevent a flash of the wrong theme */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-body bg-base text-text antialiased">
        <ThemeProvider>
          <ParticleGrid />
          <ScrollProgress />
          <DetectionCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
