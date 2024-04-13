import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import AuthProvider from "./context/AuthProvider";
import Navbar from "./component/Navbar";
import { UiProviders } from "./UiProviders";

// const inter = Inter({ subsets: ["latin"] });
const inter = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const viewport: Viewport = {
  themeColor: "#FF407D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};
export const metadata: Metadata = {
  title: "Zr Kasir",
  manifest: "/manifest.json",
  description: "Aplikasi Kasir",
  appleWebApp: {
    title: "Zr Kasir",
    statusBarStyle: "black-translucent",
    startupImage: [
      "/favicon.ico",
      {
        url: "/favicon.ico",
        media: "(device-width: 768px) and (device-height: 1024px)",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + "font-poppin"}>
        <UiProviders>
          <AuthProvider>
            <div className="max-h-screen">
              <Navbar />
              <main className="w-full max-h-[95vh]  p-4">{children}</main>
            </div>
          </AuthProvider>
        </UiProviders>
      </body>
    </html>
  );
}
