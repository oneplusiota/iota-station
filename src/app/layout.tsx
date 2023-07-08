import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/globals.scss";
import CustomThemeProvider from "../context/ThemeProvider";

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
            <header className="fixed top-0 w-full z-10 bg-transparent backdrop-blur">
              <Navbar />
            </header>
            <main className="flex-1 relative top-22 flex justify-center items-center flex-col w-full scroll-smooth">
              {children}
            </main>
            <footer className="flex-1 mt-8">
              <Footer />
            </footer>
          </div>
        </CustomThemeProvider>
      </body>
    </html>
  );
}
