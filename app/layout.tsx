import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { MotionProvider } from "@/components/motion/motion-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { company, contact } from "@/lib/content";
import "./globals.css";

// Inter is the fallback for non-Apple platforms; Apple devices use SF Pro via the system stack.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: `${company.name} — ${company.tagline}`,
    template: `%s — ${company.name}`,
  },
  description: company.description,
  applicationName: company.name,
  keywords: [
    "freight forwarder Sri Lanka",
    "freight forwarding Colombo",
    "sea freight",
    "air freight",
    "customs brokerage",
    "dangerous goods",
    "cross trade",
    "logistics Sri Lanka",
  ],
  openGraph: {
    type: "website",
    siteName: company.name,
    locale: "en_LK",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${company.url}/#organization`,
  name: company.legalName,
  alternateName: company.shortName,
  slogan: company.tagline,
  description: company.description,
  url: company.url,
  logo: `${company.url}/brand/togl-logo.png`,
  image: `${company.url}/brand/togl-logo.png`,
  email: contact.email,
  telephone: contact.phone,
  faxNumber: contact.fax,
  foundingDate: String(company.founded),
  address: {
    "@type": "PostalAddress",
    streetAddress: "No. 125, Ananda Rajakaruna Mawatha",
    addressLocality: "Colombo 10",
    addressCountry: "LK",
  },
  sameAs: [contact.facebook],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={inter.variable}>
      <body className="min-h-dvh overflow-x-clip">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <MotionProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
