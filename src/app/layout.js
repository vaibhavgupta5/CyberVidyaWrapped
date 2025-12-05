import { Inter, JetBrains_Mono, Permanent_Marker } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const permanentMarker = Permanent_Marker({
  variable: "--font-permanent-marker",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "CyberVidya Wrapped 2025",
  description: "Your year in attendance.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${permanentMarker.variable} antialiased bg-[#f0f0f0] text-zinc-900 h-screen w-screen overflow-hidden`}
      >
        <div className="absolute inset-0 z-0 bg-grid-pattern opacity-20 pointer-events-none" />
        <main className="relative z-10 h-full w-full flex flex-col items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}
