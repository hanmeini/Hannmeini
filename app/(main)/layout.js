import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Manrope } from "next/font/google";
import localFont from "next/font/local";
import { Playfair_Display } from "next/font/google";

const asgard = localFont({
  src: "../../fonts/AsgardTrial-FitRegular.ttf",
  variable: "--font-asgard",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const satoshi = localFont({
  src: "../../fonts/Satoshi-Variable.ttf",
  variable: "--font-satoshi",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.hanmeini.my.id"),
  title: {
    default: "Hanmeini - Ahmad Raihan | Software Engineer",
    template: "%s | Hanmeini",
  },
  description:
    "Portfolio of Ahmad Raihan, a Software Engineer passionate about building digital solutions with clean code and solid UX.",
  keywords: [
    "Software Engineer",
    "Web Developer",
    "Next.js",
    "React",
    "Portfolio",
    "Ahmad Raihan",
    "Hanmeini",
    "Ahmad Raihan Khomeini Saputra",
    "SMK N 8 Semarang",
    "Jasa Pembuatan Website",
    "Jasa Pembuatan Aplikasi",
    "Jasa Pembuatan Desain",
  ],
  authors: [{ name: "Ahmad Raihan" }],
  creator: "Ahmad Raihan",
  openGraph: {
    title: "Hanmeini - Ahmad Raihan | Software Engineer",
    description:
      "Building digital solutions with code, focused on clean code and solid UX.",
    url: "https://www.hanmeini.my.id",
    siteName: "Hanmeini",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hanmeini - Ahmad Raihan",
    description: "Software Engineer portfolio.",
    creator: "@hanmeini_", // Assuming/Placeholder
  },
  icons: {
    icon: "/logos/image.png",
    shortcut: "/logos/image.png",
    apple: "/logos/image.png",
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
  verification: {
    google: "EPU12ljIo0kjLeuaj5UW39PuP8RAo3RCaQVRNOX5uqs",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${manrope.variable} ${satoshi.variable} ${asgard.variable} ${playfair.variable} no-scrollbar`}
    >
      <body>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
