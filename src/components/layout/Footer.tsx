
import Link from "next/link";
import { FaeLogo } from "@/components/FaeLogo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" passHref>
                <FaeLogo className="cursor-pointer" isFooter={true} />
            </Link>
          </div>
          <div className="text-sm text-muted-foreground text-center md:text-right">
            <p>&copy; {currentYear} Fae Intelligence. All rights reserved.</p>
            <div className="mt-2 space-x-4">
              <Link href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
