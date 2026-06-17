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

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="mb-4 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Privacy
            </span>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Your Privacy Matters
            </h1>

            <p className="mt-6 text-lg text-muted-foreground">
              Havenly is committed to protecting your personal information
              and maintaining transparency about how your data is collected,
              used, and safeguarded.
            </p>

            <div className="mt-8">
              <Button size="lg" className="rounded-full px-8">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Information We Collect */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-foreground">
            Information We Collect
          </h2>

          <p className="mt-2 text-muted-foreground">
            We collect information necessary to provide and improve
            the Havenly experience.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-semibold">
              Account Information
            </h3>

            <p className="mt-3 text-muted-foreground">
              Name, email address, profile information, and account details.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-semibold">
              Booking Information
            </h3>

            <p className="mt-3 text-muted-foreground">
              Reservation details, travel preferences, and transaction history.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-semibold">
              Usage Information
            </h3>

            <p className="mt-3 text-muted-foreground">
              Platform interactions and information that helps improve services.
            </p>
          </div>
        </div>
      </section>

      {/* How We Use Data */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
          <h2 className="text-3xl font-bold text-foreground">
            How We Use Your Information
          </h2>

          <p className="mt-4 text-muted-foreground">
            Havenly uses collected information to provide services,
            manage bookings, improve user experiences, and ensure
            platform security.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-lg">
                Service Delivery
              </h3>

              <p className="mt-2 text-muted-foreground">
                Process reservations, communicate updates,
                and support users.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                Platform Improvement
              </h3>

              <p className="mt-2 text-muted-foreground">
                Analyze usage patterns to enhance features
                and performance.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                Security
              </h3>

              <p className="mt-2 text-muted-foreground">
                Protect accounts and prevent unauthorized activity.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                Customer Support
              </h3>

              <p className="mt-2 text-muted-foreground">
                Respond to questions and resolve issues efficiently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-foreground">
            Data Security
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-semibold">
              Secure Systems
            </h3>

            <p className="mt-3 text-muted-foreground">
              Measures designed to help protect user information.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-semibold">
              Account Protection
            </h3>

            <p className="mt-3 text-muted-foreground">
              Security controls that help safeguard accounts.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-semibold">
              Continuous Monitoring
            </h3>

            <p className="mt-3 text-muted-foreground">
              Ongoing efforts to maintain platform integrity.
            </p>
          </div>
        </div>
      </section>

      {/* User Rights */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
          <h2 className="text-3xl font-bold text-foreground">
            Your Rights
          </h2>

          <p className="mt-4 text-muted-foreground">
            Users may have rights regarding access, correction,
            management, or deletion of certain information,
            depending on applicable laws and regulations.
          </p>

          <p className="mt-4 text-muted-foreground">
            Havenly strives to provide transparency and control
            over personal information whenever possible.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          <FAQItem
            question="What information does Havenly collect?"
            answer="We may collect account, booking, and usage information necessary to provide services."
          />

          <FAQItem
            question="How is my information used?"
            answer="Information is used to deliver services, improve experiences, provide support, and maintain security."
          />

          <FAQItem
            question="Is my data secure?"
            answer="Havenly implements security measures designed to help protect user information."
          />

          <FAQItem
            question="Can I update my information?"
            answer="Users can manage and update account information through profile settings."
          />

          <FAQItem
            question="Who can I contact regarding privacy concerns?"
            answer="You can contact Havenly support for questions related to privacy and data handling."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-8 pb-16">
        <div className="rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold">
            Questions About Privacy?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
            Contact our team if you need assistance regarding privacy,
            account information, or data-related inquiries.
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