import { Inter } from "next/font/google";
import "./globals.css";
import Icon from "../../public/icon.png";
import Header from "./components/Header";
import AdminCheck from "./components/Admincheck";
import WAButton from "./components/WAButton";
import FeaturesSection from "./components/FeatureSection";
import Footer from "./components/Footer";
// import { usePathname } from "next/navigation";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap", // (Optional) Font swapping for better performance
});

export const metadata = {
  title: "Trend Mart",
  description: "Every Trend Starts From Here!",
  keywords: "Shop , Shopping Store",
  openGraph: {
    title: "Trend Mart",
    description: "Every Trend Starts From Here!",
    images: [Icon],
    url: "http://ab.com",
  },
  twitter: {
    title: "Trend Mart",
    description: "Every Trend Starts From Here!",
    images: [Icon],
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} overflow-x-hidden antialiased`}>
        <AdminCheck>
          <Header />
        </AdminCheck>
        {children}
        <AdminCheck>
          <WAButton />
          <FeaturesSection />
          <Footer />
        </AdminCheck>
      </body>
    </html>
  );
}
