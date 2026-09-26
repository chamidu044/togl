"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Mail, Phone } from "lucide-react";
import {
  MobileNav,
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  NavItems,
} from "@/components/ui/resizable-navbar";
import { Navbar } from "@/components/ui/resizable-navbar";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Logo } from "@/components/layout/logo";
import { contact, navLinks } from "@/lib/content";

const sectionIds = navLinks.flatMap((l) => (l.section ? [l.section] : []));

/** Tracks which home-page section is in the middle of the viewport. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          setActive((prev) =>
            entry.isIntersecting ? id : prev === id ? null : prev,
          );
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? active : null;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const activeSection = useActiveSection(pathname === "/");

  const activeHref =
    pathname === "/"
      ? activeSection
        ? `/#${activeSection}`
        : null
      : (navLinks.find((l) => !l.section && pathname.startsWith(l.href))?.href ?? null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <Navbar>
      {/* Desktop */}
      <NavBody>
        <div className="flex items-center">
          <Logo />
        </div>
        <NavItems items={navLinks} activeHref={activeHref} />
        <div className="flex items-center justify-end gap-2">
          <a
            href={contact.phoneHref}
            className="hidden rounded-full px-3 py-2 text-caption text-ink-muted transition-colors hover:text-ink xl:inline-flex"
          >
            {contact.phone}
          </a>
          <HoverBorderGradient
            as={Link}
            href="/contact"
            className="text-caption-strong px-5 py-2.5"
          >
            Get a quote
          </HoverBorderGradient>
        </div>
      </NavBody>

      {/* Mobile */}
      <MobileNav>
        <div className="flex items-center justify-between">
          <Logo compact onClick={() => setOpen(false)} />
          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="press rounded-full bg-brand-navy px-4 py-2.5 text-caption-strong text-white"
            >
              Get a quote
            </Link>
            <MobileNavToggle
              isOpen={open}
              onClick={() => setOpen((v) => !v)}
              controls="mobile-menu"
            />
          </div>
        </div>
      </MobileNav>
      <MobileNavMenu isOpen={open} id="mobile-menu">
        <ul className="flex flex-col">
          {navLinks.map((link, i) => (
            <motion.li
              key={link.href}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.04 * i + 0.05 }}
            >
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={link.href === activeHref ? "page" : undefined}
                className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-[22px] font-semibold tracking-[-0.02em] text-ink transition-colors hover:bg-ink/[0.04] aria-[current=page]:text-brand-blue"
              >
                {link.name}
              </Link>
            </motion.li>
          ))}
        </ul>
        <div className="mt-2 grid grid-cols-2 gap-2 border-t border-hairline pt-3">
          <a
            href={contact.phoneHref}
            className="press flex items-center justify-center gap-2 rounded-full bg-mist px-4 py-3 text-caption-strong text-ink"
          >
            <Phone className="h-4 w-4" /> Call us
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="press flex items-center justify-center gap-2 rounded-full bg-mist px-4 py-3 text-caption-strong text-ink"
          >
            <Mail className="h-4 w-4" /> Email us
          </a>
        </div>
      </MobileNavMenu>
    </Navbar>
  );
}
