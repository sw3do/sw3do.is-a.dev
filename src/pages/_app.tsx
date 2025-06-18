import React, { useEffect, useState } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import Head from "next/head";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  const [title, setTitle] = useState("");
  const targetTitle = "./sw3do";

  useEffect(() => {
    let currentIndex = 0;
    let isDeleting = false;
    
    const typingInterval = setInterval(() => {
      if (!isDeleting) {
        if (currentIndex <= targetTitle.length) {
          setTitle(targetTitle.slice(0, currentIndex));
          currentIndex++;
        } else {
          setTimeout(() => {
            isDeleting = true;
          }, 2000);
        }
      } else {
        if (currentIndex > 0) {
          setTitle(targetTitle.slice(0, currentIndex - 1));
          currentIndex--;
        } else {
          isDeleting = false;
          currentIndex = 0;
        }
      }
    }, isDeleting ? 100 : 150);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="sw3do - Full Stack Developer. Building user-friendly and performant applications with modern web technologies." />
        <meta name="keywords" content="sw3do, developer, full stack, react, nextjs, typescript, javascript, web development, software engineer" />
        <meta name="author" content="sw3do" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        <meta property="og:title" content="sw3do - Full Stack Developer" />
        <meta property="og:description" content="Building user-friendly and performant applications with modern web technologies." />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:title" content="sw3do - Full Stack Developer" />
        <meta name="twitter:description" content="Building user-friendly and performant applications with modern web technologies." />
        
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={poppins.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
