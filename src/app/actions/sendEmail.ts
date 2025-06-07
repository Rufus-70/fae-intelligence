"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export async function sendEmailAction(
  prevState: { message: string | null; errors: any | null },
  formData: FormData
) {
  try {
    const validatedFields = contactSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    });

    if (!validatedFields.success) {
      return {
        message: "Validation failed. Please check your input.",
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { name, email, message } = validatedFields.data;

    // Simulate email sending
    console.log("--- Contact Form Submission ---");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);
    console.log("--- Email Sent (Mock) ---");

    // In a real application, you would integrate with an email service like SendGrid, Resend, etc.
    // For example:
    // await resend.emails.send({
    //   from: 'onboarding@resend.dev',
    //   to: 'your-email@example.com',
    //   subject: `New Contact Form Message from ${name}`,
    //   html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
    // });

    return { message: "Your message has been sent successfully!", errors: null };
  } catch (error) {
    console.error("Error in sendEmailAction:", error);
    return {
      message: "An unexpected error occurred. Please try again later.",
      errors: null,
    };
  }
}