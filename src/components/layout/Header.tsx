"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ContactModal } from "@/components/ui/ContactModal";
import { FaeLogo } from "@/components/FaeLogo";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React from "react";

const navItems = [
  { href: "/#research", label: "Research" },
  { href: "/#founders", label: "Founders" },
  { href: "/#team", label: "Team" },
  { href: "/#join-us", label: "Careers" },
];

export function Header() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  const commonNavLinks = (
    <>
      {navItems.map((item) => (
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
        <Button variant="outline" onClick={() => { setIsModalOpen(true); setIsSheetOpen(false); }}>Contact</Button>
      </ContactModal>
       <Link href="/admin" passHref>
          <Button variant="ghost" size="sm" onClick={() => setIsSheetOpen(false)}>Admin</Button>
        </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" passHref>
          <FaeLogo className="cursor-pointer" />
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          {commonNavLinks}
        </nav>

        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 pt-6">
                {commonNavLinks}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}