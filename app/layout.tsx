import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tanay Maheshwari - Cloud & DevOps Engineer",
  description: "Portfolio of Tanay Maheshwari - MS in Computer and Information Technology at Purdue University, specializing in Cloud Architecture, Kubernetes, and ML Infrastructure",
  keywords: ["Tanay Maheshwari", "Cloud Engineer", "DevOps", "Kubernetes", "GCP", "Azure", "Purdue University"],
  authors: [{ name: "Tanay Maheshwari" }],
  openGraph: {
    title: "Tanay Maheshwari - Cloud & DevOps Engineer",
    description: "Portfolio showcasing cloud infrastructure, DevOps, and ML projects",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
