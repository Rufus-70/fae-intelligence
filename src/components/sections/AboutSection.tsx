
export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-headline">About Us</h2>
        <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          This is the About Us section. Replace this with details about your company, mission, and vision.
          Fae Intelligence Reborn is dedicated to pioneering advancements in artificial general intelligence. 
          Our mission is to build safe and beneficial AGI that empowers humanity and fosters a deeper understanding of intelligence itself.
        </p>
        {/* You can add more content like team overview, company values, etc. */}
      </div>
    </section>
  );
}
