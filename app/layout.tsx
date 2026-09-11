import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";

import "./globals.css";

const NoxShell = dynamic(
  () => import("@/components/nox-shell").then((module) => module.NoxShell),
  { ssr: false },
);

export const metadata: Metadata = {
  metadataBase: new URL("https://noxbuild.cc"),

  title: {
    default: "The Nox Build System",
    template: "Nox / %s",
  },

  description: "The Nox Build System",

  icons: {
    icon: "/assets/nox-Icon.png",
    shortcut: "/assets/nox-Icon.png",
    apple: "/assets/nox-Icon.png",
  },

  openGraph: {
    title: "Nox",
    description: "The Nox Build System",
    type: "website",
    siteName: "Nox",
    images: [
      {
        url: "/assets/nox-Icon.png",
        width: 1024,
        height: 1024,
        alt: "Nox",
      },
    ],
  },

  twitter: {
    card: "summary",
    title: "Nox",
    description: "The Nox Build System",
    images: ["/assets/nox-Icon.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#C4A7E7",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <NoxShell>{children}</NoxShell>
      </body>
    </html>
  );
}
