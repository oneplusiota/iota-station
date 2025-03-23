import "../styles/globals.scss";
import CustomThemeProvider from "../context/ThemeProvider";
import MainSection from "./MainSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shivam Nayak | Backend Developer",
  description: "Backend Developer specializing in Java Springboot and Node.js. Final year student at IIT Kharagpur.",
  keywords: ["Backend Developer", "Java", "Springboot", "Node.js", "IIT Kharagpur", "Portfolio", "Web Development"],
  authors: [{ name: "Shivam Nayak" }],
  creator: "Shivam Nayak",
  metadataBase: new URL("https://oneplusiota.vercel.app"),
  openGraph: {
    title: "Shivam Nayak | Backend Developer",
    description: "Backend Developer specializing in Java Springboot and Node.js. Final year student at IIT Kharagpur.",
    url: "https://oneplusiota.vercel.app",
    siteName: "Shivam Nayak Portfolio",
    images: [
      {
        url: "/profile.jpg",
        width: 800,
        height: 600,
        alt: "Shivam Nayak",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shivam Nayak | Backend Developer",
    description: "Backend Developer specializing in Java Springboot and Node.js. Final year student at IIT Kharagpur.",
    images: ["/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="hide-scroll">
        <CustomThemeProvider>
          <div className="flex flex-col min-h-screen">
            <MainSection>{children}</MainSection>
          </div>
        </CustomThemeProvider>
      </body>
    </html>
  );
}
