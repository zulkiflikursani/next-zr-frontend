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
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};
export const metadata: Metadata = {
  title: "Zr Kasir",
  description: "Aplikasi Kasir",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UiProviders>
          <AuthProvider>
            <Navbar />
            <main className="w-full h-screen p-4">{children}</main>
          </AuthProvider>
        </UiProviders>
      </body>
    </html>
  );
}
