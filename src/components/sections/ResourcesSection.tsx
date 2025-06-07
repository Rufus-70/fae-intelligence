
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ArrowRight } from "lucide-react";

export function ResourcesSection() {

  return (
    <section id="resources" className="py-16 md:py-24 bg-muted text-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-3">
            The Fae Intelligence Resource Hub
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground font-headline">
            Unlock Your Teams Full Potential
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <Card className="bg-card border-border/50 shadow-lg text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <BookOpen className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-2xl font-semibold font-headline text-card-foreground">
                AI Blogs & Case Studies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Explore practical, real-world examples of AI in action. Our blog features insights, how-tos, and success stories relevant to your business.
              </p>
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/blog">
                  Read Our Blog <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-semibold font-headline text-foreground mb-4">
            Actionable Insights, Tools, and Training to Master AI in Your Business
          </h3>
          <p className="text-lg text-muted-foreground">
            Dive into the Fae Intelligence Resource Hub. Discover practical AI overviews, explore cutting-edge tools with hands-on training modules, and access expert guides designed to empower your teams. We translate complex AI into actionable strategies for immediate operational improvements and lasting innovation.
          </p>
        </div>
      </div>
    </section>
  );
}
