
import Link from "next/link";
import { FaeLogo } from "@/components/FaeLogo";
import { Linkedin } from "lucide-react"; // Import Linkedin icon

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
            <div className="mt-2 space-x-4 flex items-center justify-center md:justify-end">
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
