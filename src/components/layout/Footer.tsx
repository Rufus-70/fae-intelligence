// [COPY THE FOOTER CONTENT FROM STEP 4 ARTIFACT]
// src/components/layout/Footer.tsx
import Link from 'next/link'
import { Linkedin, Mail, Phone } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold text-cyan-500 mb-4">Fae Intelligence</div>
            <p className="text-gray-300 mb-4">AI, Made Practical for Businesses.</p>
            <p className="text-gray-400 text-sm">
              Empowering teams with over 30 years of operational excellence and cutting-edge AI solutions.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-cyan-500" />
                <a href="mailto:rsnyder@FaeIntelligence.com" className="text-gray-300 hover:text-white transition-colors">
                  rsnyder@FaeIntelligence.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-cyan-500" />
                <a href="tel:503-901-8645" className="text-gray-300 hover:text-white transition-colors">
                  503-901-8645
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Linkedin className="h-5 w-5 text-cyan-500" />
                <a 
                  href="https://www.linkedin.com/company/107101157" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  LinkedIn Company Page
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-gray-300 hover:text-white transition-colors">
                About Us
              </Link>
              <Link href="/services" className="block text-gray-300 hover:text-white transition-colors">
                Services
              </Link>
              <Link href="/training" className="block text-gray-300 hover:text-white transition-colors">
                Training
              </Link>
              <Link href="/blog" className="block text-gray-300 hover:text-white transition-colors">
                Blog
              </Link>
              <Link href="/consultation" className="block text-gray-300 hover:text-white transition-colors">
                Get Started
              </Link>
              <Link href="/sitemap" className="block text-gray-300 hover:text-white transition-colors">
                Site Map
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {currentYear} Fae Intelligence. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}