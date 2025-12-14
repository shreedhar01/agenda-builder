import type { Metadata } from "next";
import "@repo/ui/globals.css";
import { Toaster } from "react-hot-toast";
import  StateProvider  from './provider'

export const metadata: Metadata = {
  title: "Agenda Builder",
  description: "Here you can build agenda for toastmaster.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <StateProvider>
          {children}
        </StateProvider>
      </body>
    </html>
  );
}
