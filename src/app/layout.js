/**
 * The RootLayout component is the root layout for the entire website. It includes the header, footer,
 * and page content, as well as sets the document language and font.
 * @param {object} children - The child components to render within the layout.
 * @returns The HTML layout for the website.
 **/

// External imports
import { Inter } from '@next/font/google';
import './globals.css';

// Component imports
import Header from "../components/header";
import Footer from "../components/footer";
import PageHeading from "../components/pageHeading";

// Define Inter font subset
const inter = Inter({ subsets: ['latin'] });

// Metadata for the website
export const metadata = {
  title: 'LinguaTune: Harmonizing Speech Barriers',
  description: 'Take your videos to the next level with our state-of-the-art AI platform designed to transcribe videos with near-human accuracy. Add captions or voice-over in any language of your choice effortlessly.',
};

export default function RootLayout({ children }) {

  return (
    <html lang="en" className={inter.className}>

      <body className="bg-gradient-to-b from-blue-900 to-cyan-600 min-h-screen w-full max-w-none mx-auto">

        <main className="p-4 max-w-6xl mx-auto flex flex-col gap-10 min-h-screen">

          {/* Render the header */}
          <Header/>

          {/* Render the page heading */}
          <PageHeading />

          {/* Render the children components */}
          {children}

          {/* Render the footer */}
          <Footer/>

        </main>

      </body>
    </html>
  );
}
