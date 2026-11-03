import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Pepper",
  description: "Open source way to manage your short links",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="pepper">
      <body>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              borderRadius: "10px",
              background: "#2a2533",
              color: "#fff",
              fontSize: "14px",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
