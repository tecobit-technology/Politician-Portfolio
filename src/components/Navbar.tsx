"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitch from "@/components/LanguageSwitch";

const navLinks = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/journey", key: "journey" },
  { href: "/work", key: "work" },
  { href: "/news", key: "news" },
] as const;

export default function Navbar() {
  const t = useTranslations("Navbar");

  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;

      // navbar shadow after scrolling
      setScrolled(currentScrollY > 8);

      // hide navbar while scrolling down
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      }
      // show navbar while scrolling up
      else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    // show navbar when mouse reaches top
    const onMouseMove = (e: MouseEvent) => {
      if (e.clientY < 50) {
        setShowNavbar(true);
      }
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [lastScrollY]);

  const getLinkClass = (href: string) =>
    `font-medium font-semibold transition ${
      pathname === href ? "text-primary-100" : "text-primary"
    } hover:text-primary-100/80`;

  // keep the navbar visible while the mobile menu is open
  const visible = showNavbar || menuOpen;

  return (
    <header>
      <nav
        className={`
          fixed top-3 left-1/2 -translate-x-1/2 z-50
          w-[calc(100%-1.5rem)] max-w-6xl
          bg-white/90 backdrop-blur-xl
          rounded-3xl
          px-4 py-3 sm:px-6
          flex items-center justify-between gap-3 sm:gap-6
          text-black
          border border-gray-200/70
          transition-all duration-300 ease-in-out

          ${visible ? "translate-y-0" : "-translate-y-32"}

          ${scrolled ? "shadow-xl" : "shadow-md"}
        `}
      >
        {/* Logo / Title */}
        <div className="whitespace-nowrap text-base font-semibold sm:text-lg">
          Chairperson, Kalikot
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-8 text-sm">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={getLinkClass(link.href)}>
                {t(link.key)}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitch />

          {/* Contact Button (desktop and tablet) */}
          <Link
            href="/contact"
            className="
              ml-2
              hidden sm:inline-flex
              rounded-full
              bg-[#8a1538]
              px-4 py-2
              text-sm
              font-medium
              text-white
              transition
              hover:opacity-90
            "
          >
            {t("contact")}
          </Link>

          {/* Hamburger (mobile only) */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="rounded-full p-2 transition hover:bg-gray-100 md:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            id="mobile-menu"
            className="
              absolute left-0 right-0 top-full mt-2
              rounded-3xl border border-gray-200/70
              bg-white/95 p-3 shadow-xl backdrop-blur-xl
              md:hidden
            "
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block rounded-2xl px-4 py-3 text-base ${getLinkClass(
                      link.href,
                    )} hover:bg-gray-100`}
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}

              <li className="sm:hidden">
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="mt-1 block rounded-2xl bg-[#8a1538] px-4 py-3 text-center text-base font-medium text-white"
                >
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}