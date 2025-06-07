
import Link from "next/link";
import { FaeLogo } from "@/components/FaeLogo";
import { Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="flex flex-col items-center md:flex-row md:justify-between md:items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" passHref>
                <FaeLogo className="cursor-pointer" isFooter={true} />
            </Link>
          </div>
          <div className="text-sm text-muted-foreground text-center md:text-justify space-y-2">
            <p>&copy; {currentYear} Fae Intelligence LLC. All rights reserved.</p>
            <p>Empowering PNW Small to Medium-sized Businesses with Practical AI.</p>
            <p>
              <Link href="https://FaeIntelligence.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                https://FaeIntelligence.com
              </Link>
            </p>
            <p>
              <Link href="mailto:RSnyder@FaeIntelligence.com" className="hover:text-foreground transition-colors">
                RSnyder@FaeIntelligence.com
              </Link>
            </p>
            <div className="mt-4 pt-2 border-t border-border/30 md:border-t-0 md:pt-0 md:mt-2 flex items-center justify-center md:justify-start space-x-4">
              <Link href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <a
                href="https://www.linkedin.com/company/fae-intelligence/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Fae Intelligence LinkedIn"
                className="hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
