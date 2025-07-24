import ConsultationForm from '@/components/forms/ConsultationForm';
import { Section } from '@/components/layout/Section';

export default function ConsultationPage() {
  return (
    <Section
      title="Schedule Your Free Consultation"
      subtitle="Let's discuss how Fae Intelligence can solve your manufacturing challenges."
    >
      <div className="max-w-2xl mx-auto mt-8 bg-white p-8 rounded-lg shadow-md">
        <ConsultationForm />
      </div>
    </Section>
  );
}