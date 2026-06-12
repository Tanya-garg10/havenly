'use client';

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-border bg-card">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-5 text-left"
      >
        <span className="font-medium text-foreground">
          {question}
        </span>

        <span className="text-2xl font-light text-muted-foreground">
          {open ? "−" : "+"}
        </span>
      </button>

      {open && (
        <div className="px-5 pb-5 text-muted-foreground">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function HelpCentrePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="mb-4 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Help Centre
            </span>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              How Can We Help?
            </h1>

            <p className="mt-6 text-lg text-muted-foreground">
              Find answers to common questions, manage your bookings,
              understand payments, and get support for your Havenly
              experience.
            </p>

            <div className="mt-8">
              <Button size="lg" className="rounded-full px-8">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-foreground">
            Browse Help Topics
          </h2>

          <p className="mt-2 text-muted-foreground">
            Quickly find information related to your account, bookings,
            payments, and travel support.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-semibold">
              Booking Support
            </h3>

            <p className="mt-2 text-muted-foreground">
              Reservation changes, cancellations, and booking issues.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-semibold">
              Payments & Refunds
            </h3>

            <p className="mt-2 text-muted-foreground">
              Billing questions, refunds, and payment methods.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-semibold">
              Account & Security
            </h3>

            <p className="mt-2 text-muted-foreground">
              Login help, profile management, and account protection.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-semibold">
              Travel Assistance
            </h3>

            <p className="mt-2 text-muted-foreground">
              Support before, during, and after your trip.
            </p>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-foreground">
            Popular Resources
          </h2>

          <p className="mt-2 text-muted-foreground">
            Frequently accessed support topics and guides.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-semibold">
              Managing Reservations
            </h3>

            <p className="mt-3 text-muted-foreground">
              Learn how to modify, extend, or cancel your bookings.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-semibold">
              Payment Information
            </h3>

            <p className="mt-3 text-muted-foreground">
              Understand charges, refunds, and payment processing.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-semibold">
              Safety & Trust
            </h3>

            <p className="mt-3 text-muted-foreground">
              Explore resources designed to keep travel safe and secure.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>

          <p className="mt-2 text-muted-foreground">
            Quick answers to common questions from travelers.
          </p>
        </div>

        <div className="space-y-4">
          <FAQItem
            question="How do I cancel a booking?"
            answer="You can cancel a booking from your dashboard by selecting the reservation and choosing the cancellation option. Refund eligibility depends on the property's cancellation policy."
          />

          <FAQItem
            question="Can I modify an existing reservation?"
            answer="Many reservations can be modified before check-in, depending on availability and host policies."
          />

          <FAQItem
            question="How do refunds work?"
            answer="Refunds are processed according to the cancellation policy associated with the reservation and may take several business days to appear."
          />

          <FAQItem
            question="What payment methods are accepted?"
            answer="Havenly supports major credit cards, debit cards, and other approved payment methods available in your region."
          />

          <FAQItem
            question="How do I contact customer support?"
            answer="You can reach support through the Help Centre, support forms, or other official communication channels available on the platform."
          />

          <FAQItem
            question="What should I do if I have check-in issues?"
            answer="If you experience check-in difficulties, contact the property host first. If the issue remains unresolved, Havenly support can assist."
          />

          <FAQItem
            question="How do I update my account information?"
            answer="Visit your profile settings to update personal information, contact details, and account preferences."
          />

          <FAQItem
            question="Is my payment information secure?"
            answer="Havenly uses industry-standard security measures to protect user data and payment information."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold">
            Still Need Assistance?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
            Our support team is here to help answer questions and
            resolve issues so you can enjoy a smooth travel experience.
          </p>

          <Button
            variant="secondary"
            size="lg"
            className="mt-8 rounded-full"
          >
            Contact Support
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}