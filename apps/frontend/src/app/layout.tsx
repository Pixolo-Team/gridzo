// STYLES //
import "./globals.css";

// COMPONENTS //
import { Inter, Geist } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

// CONTEXTS //
import { AuthProvider } from "@/contexts/AuthContext";

// OTHERS //
import { cn } from "@/lib/utils";

// DATA //
import type { Metadata } from "next";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gridzo",
  description: "Gridzo helps teams manage and deploy project content faster.",
};

/**
 * Renders the root application layout
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions

  // Use Effects

  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="antialiased font-sans min-h-screen bg-n-100">
        <AuthProvider>{children}</AuthProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
