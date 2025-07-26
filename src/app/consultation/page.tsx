import ConsultationForm from '@/components/forms/ConsultationForm';
import { Section } from '@/components/layout/Section';

export default function ConsultationPage() {
  return (
    <Section>
      <div className="text-center mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Schedule Your Free Consultation
        </h1>
        <p className="text-lg text-gray-600">
          Let's discuss how Fae Intelligence can solve your manufacturing challenges.
        </p>
      </div>
      <div className="max-w-2xl mx-auto mt-8 bg-white p-8 rounded-lg shadow-md">
        <ConsultationForm />
      </div>
    </Section>
  );
}