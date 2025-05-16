import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import AuthControl from "../utils/authControl";
import "./styles.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Frxsh",
  description: "For the students, by the students",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <a id="menu" className="navInfoMobile">
            <img src="/assets/icons/menu.svg" alt="Menu" />
          </a>
          <a className="navInfoMobile">frxsh</a>
          <Link className="navInfo" href="/#home">HOME</Link>
          <Link className="navInfo" href="/#products">PRODUCTS</Link>
          <Link className="navInfo" href="/contactUs">CONTACT US</Link>
          <AuthControl />
        </nav>
        {children}
      </body>
    </html>
  );
}