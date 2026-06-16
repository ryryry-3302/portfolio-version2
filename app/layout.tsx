import "../global.css";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: {
    default: "Leong Ko Ryan Jasper | Robotics & Embedded Software Engineer",
    template: "%s | Ryan Leong",
  },
  description: "Robotics & Embedded Software Engineer specializing in SLAM, sensor fusion, embedded systems, and autonomous navigation for robotics applications.",
  openGraph: {
    title: "Leong Ko Ryan Jasper | Robotics & Embedded Software Engineer",
    description:
      "Robotics & Embedded Software Engineer specializing in SLAM, sensor fusion, embedded systems, and autonomous navigation for robotics applications.",
    url: "https://portfolio-version2-five.vercel.app/",
    siteName: "Ryan Leong Portfolio",
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  keywords: [
    "Robotics Software Engineer",
    "Embedded Systems Engineer",
    "SLAM",
    "ORB SLAM3",
    "Sensor Fusion",
    "Computer Engineering",
    "NUS",
    "Stanford",
    "ZeroshotData",
    "Autonomous Navigation",
    "Robotics",
  ],
  authors: [{ name: "Leong Ko Ryan Jasper" }],
  icons: {
    shortcut: "/favicon.png",
  },
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
      <head>
        <VercelAnalytics />
        <Analytics />
      </head>
      <body
        className={`text-zinc-100 min-h-screen ${process.env.NODE_ENV === "development" ? "debug-screens" : undefined
          }`}
      >
        {children}
      </body>
    </html>
  );
}
