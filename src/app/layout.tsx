import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/globals.scss";
import CustomThemeProvider from "../context/ThemeProvider";
import MainSection from "./MainSection";

export const metadata = {
  title: "Shivam Nayak",
  description: "Backend Developer Portfolio",
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
