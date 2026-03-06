import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/ui/navbar";
import { Toaster } from "react-hot-toast";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bondify store",
  description: "A simple e-commerce store built with nextjs and taiwind",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
       <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'dark';
                  var html = document.documentElement;
                  // Remove any previous theme classes
                  var themes = ${JSON.stringify([
                    "light",
                    "dark",
                    "cupcake",
                    "bumblebee",
                    "emerald",
                    "corporate",
                    "synthwave",
                    "retro",
                    "cyberpunk",
                    "valentine",
                    "halloween",
                    "garden",
                    "forest",
                    "aqua",
                    "lofi",
                    "pastel",
                    "fantasy",
                    "wireframe",
                    "black",
                    "luxury",
                    "dracula",
                  ])};
                  html.classList.remove('dark');
                  themes.forEach(t => html.classList.remove('theme-' + t));

                  if(theme === 'dark') {
                    html.classList.add('dark');
                  } else {
                    html.classList.add('theme-' + theme);
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider 
             attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>

        <header>
            <Navbar/>
        </header>


     <main>{children}</main>
  <Toaster position="top-right" reverseOrder={false} /> 
     
          <footer className="border-t flex items-center justify-center p-6">
            <div className=" container text-sm text-gray-500 text-center text-muted-foreground">
              © {new Date().getFullYear()} Bondify. All rights reserved.
            </div>

          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
