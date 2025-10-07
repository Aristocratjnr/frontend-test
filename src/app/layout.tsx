import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./contexts/AuthContext";
import { ProductsProvider } from "./contexts/ProductsContext";
import { OrdersProvider } from "./contexts/OrdersContext";
import { ReportsProvider } from "./contexts/ReportsContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Syst POS",
  description: "Modern Point of Sale System",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0DD983",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full bg-gray-50`}
      >
        <AuthProvider>
          <ProductsProvider>
            <OrdersProvider>
              <ReportsProvider>
                <div className="min-h-screen">
                  {children}
                </div>
              </ReportsProvider>
            </OrdersProvider>
          </ProductsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
