import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const steps = [
  {
    title: "List Your Space",
    description:
      "Create a listing with photos, descriptions, amenities, and pricing details.",
  },
  {
    title: "Welcome Guests",
    description:
      "Connect with travelers and provide memorable experiences during their stay.",
  },
  {
    title: "Earn Income",
    description:
      "Turn your extra space into an opportunity while hosting responsibly.",
  },
];

const benefits = [
  {
    title: "Flexible Hosting",
    description:
      "Host whenever it works for your schedule and availability.",
  },
  {
    title: "Host Support",
    description:
      "Access resources and guidance to help you succeed.",
  },
  {
    title: "Secure Experience",
    description:
      "Benefit from tools designed to support hosts and guests.",
  },
];

export default function HavenlyYourHomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="mb-4 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Havenly Your Home
            </span>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Share Your Home With Travelers
            </h1>

            <p className="mt-6 text-lg text-muted-foreground">
              Become a Havenly host and welcome guests from around the
              world while earning extra income and creating memorable
              experiences.
            </p>

            <div className="mt-8">
              <Button size="lg" className="rounded-full px-8">
                Start Hosting
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
          <h2 className="text-3xl font-bold text-foreground">
            Why Host on Havenly?
          </h2>

          <p className="mt-4 text-muted-foreground">
            Hosting allows you to share your space, connect with guests,
            and earn income while becoming part of a global community.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-foreground">
            How Hosting Works
          </h2>

          <p className="mt-2 text-muted-foreground">
            Getting started as a host is simple.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.title}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="text-xl font-semibold text-foreground">
                {step.title}
              </h3>

              <p className="mt-3 text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
          <h2 className="text-3xl font-bold text-foreground">
            Hosting Benefits
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl border p-6"
              >
                <h3 className="text-lg font-semibold">
                  {benefit.title}
                </h3>

                <p className="mt-2 text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border p-6">
            <h3 className="font-semibold">
              Who can become a host?
            </h3>

            <p className="mt-2 text-muted-foreground">
              Anyone with a suitable space and willingness to welcome
              guests can explore hosting opportunities.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="font-semibold">
              How do I create a listing?
            </h3>

            <p className="mt-2 text-muted-foreground">
              Create a listing by adding photos, descriptions, pricing,
              and property details.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="font-semibold">
              Is hosting flexible?
            </h3>

            <p className="mt-2 text-muted-foreground">
              Yes. Hosts can decide their availability and hosting schedule.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-8 pb-16">
        <div className="rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold">
            Ready to Become a Host?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
            Start sharing your space and become part of the Havenly
            hosting community.
          </p>

          <Button
            variant="secondary"
            size="lg"
            className="mt-8 rounded-full"
          >
            Start Hosting
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}