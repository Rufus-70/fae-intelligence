
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ContactModal } from "@/components/ui/ContactModal";
import { FaeLogo } from "@/components/FaeLogo";
import { Menu, LogIn } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import React from "react";
import { ThemeToggleButton } from "@/components/ui/ThemeToggleButton"; // Added ThemeToggleButton

const publicNavItems = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#resources", label: "Resources" },
];

export function Header() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  const commonNavLinks = (
    <>
      {publicNavItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          onClick={() => setIsSheetOpen(false)}
        >
          {item.label}
        </Link>
      ))}
      <ContactModal open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground" onClick={() => { setIsModalOpen(true); setIsSheetOpen(false); }}>Contact</Button>
      </ContactModal>
      <Link href="/admin" passHref>
        <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" onClick={() => setIsSheetOpen(false)}>
          <LogIn className="mr-2 h-4 w-4 md:hidden lg:inline-block" /> Admin
        </Button>
      </Link>
      <ThemeToggleButton />
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" passHref>
          <FaeLogo className="cursor-pointer" />
        </Link>
        
        <nav className="hidden md:flex items-center space-x-4"> {/* Adjusted space-x for new button */}
          {commonNavLinks}
        </nav>

        <div className="md:hidden flex items-center space-x-2"> {/* Added space-x for mobile */}
          <ThemeToggleButton />
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background">
              <SheetHeader>
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 pt-6">
                {publicNavItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <ContactModal open={isModalOpen} onOpenChange={setIsModalOpen}>
                  <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground" onClick={() => { setIsModalOpen(true); setIsSheetOpen(false); }}>Contact</Button>
                </ContactModal>
                <Link href="/admin" passHref>
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground" onClick={() => setIsSheetOpen(false)}>
                    <LogIn className="mr-2 h-4 w-4" /> Admin
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
