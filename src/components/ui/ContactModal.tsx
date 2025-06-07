"use client";

import React, { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendEmailAction } from "@/app/actions/sendEmail";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

interface ContactModalProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
      {pending ? "Sending..." : "Send Message"}
    </Button>
  );
}

export function ContactModal({ children, open, onOpenChange }: ContactModalProps) {
  const { toast } = useToast();
  const [state, formAction] = useFormState(sendEmailAction, { message: null, errors: null });

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  useEffect(() => {
    if (state?.message) {
      if (state.errors) {
        toast({
          title: "Error",
          description: state.message,
          variant: "destructive",
        });
        // Set form errors manually
        if (state.errors.name) form.setError("name", { type: "server", message: state.errors.name[0] });
        if (state.errors.email) form.setError("email", { type: "server", message: state.errors.email[0] });
        if (state.errors.message) form.setError("message", { type: "server", message: state.errors.message[0] });

      } else {
        toast({
          title: "Success!",
          description: state.message,
        });
        form.reset();
        if (onOpenChange) onOpenChange(false); // Close modal on success
      }
    }
  }, [state, toast, form, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[480px] bg-card">
        <DialogHeader>
          <DialogTitle className="text-card-foreground font-headline">Contact Us</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Fill out the form below and we'll get back to you as soon as possible.
          </DialogDescription>
        </DialogHeader>
        <form
          action={formAction}
          className="space-y-4"
        >
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-card-foreground">Name</Label>
            <Input
              id="name"
              {...form.register("name")}
              placeholder="Your Name"
              className="bg-input text-foreground placeholder:text-muted-foreground"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-card-foreground">Email</Label>
            <Input
              id="email"
              type="email"
              {...form.register("email")}
              placeholder="your@email.com"
               className="bg-input text-foreground placeholder:text-muted-foreground"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message" className="text-card-foreground">Message</Label>
            <Textarea
              id="message"
              {...form.register("message")}
              placeholder="Your message..."
              rows={5}
              className="bg-input text-foreground placeholder:text-muted-foreground"
            />
            {form.formState.errors.message && (
              <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>
            )}
          </div>
          <DialogFooter>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
