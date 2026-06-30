import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const protections = [
  {
    title: "Reservation Protection",
    description:
      "Support for certain issues that may occur before or during reservations.",
  },
  {
    title: "Property Protection",
    description:
      "Protection measures designed to help hosts manage unexpected incidents.",
  },
  {
    title: "Guest Verification",
    description:
      "Tools that help promote trust and confidence between hosts and guests.",
  },
];

const coverage = [
  {
    title: "Host Support",
    description:
      "Access resources and guidance whenever hosting assistance is needed.",
  },
  {
    title: "Safety Resources",
    description:
      "Learn best practices for creating safe and welcoming spaces.",
  },
  {
    title: "24/7 Assistance",
    description:
      "Support services available to help address hosting concerns.",
  },
];

export default function AirCoverHostsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="mb-4 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              AirCover for Hosts
            </span>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Protection and Support for Hosts
            </h1>

            <p className="mt-6 text-lg text-muted-foreground">
              AirCover for Hosts provides resources, support, and
              protection tools designed to help hosts feel confident
              while welcoming guests.
            </p>

            <div className="mt-8">
              <Button size="lg" className="rounded-full px-8">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
          <h2 className="text-3xl font-bold text-foreground">
            Hosting With Confidence
          </h2>

          <p className="mt-4 text-muted-foreground">
            AirCover for Hosts offers resources and support designed to
            help hosts manage their listings and provide positive guest
            experiences.
          </p>
        </div>
      </section>

      {/* Protection Features */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-foreground">
            Protection Features
          </h2>

          <p className="mt-2 text-muted-foreground">
            Explore the tools and support available to hosts.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {protections.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="text-xl font-semibold text-foreground">
                {item.title}
              </h3>

              <p className="mt-3 text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Coverage */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
          <h2 className="text-3xl font-bold text-foreground">
            Additional Support
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {coverage.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border p-6"
              >
                <h3 className="text-lg font-semibold">
                  {item.title}
                </h3>

                <p className="mt-2 text-muted-foreground">
                  {item.description}
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
              What is AirCover for Hosts?
            </h3>

            <p className="mt-2 text-muted-foreground">
              It provides resources and protection features designed to
              support hosts throughout their hosting journey.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="font-semibold">
              Who can access AirCover?
            </h3>

            <p className="mt-2 text-muted-foreground">
              AirCover features are intended to support Havenly hosts.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="font-semibold">
              How can hosts learn more?
            </h3>

            <p className="mt-2 text-muted-foreground">
              Hosts can explore additional resources and support pages
              available on Havenly.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-8 pb-16">
        <div className="rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold">
            Host With Peace of Mind
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
            Learn about the support and protection resources available
            to Havenly hosts.
          </p>

          <Button
            variant="secondary"
            size="lg"
            className="mt-8 rounded-full"
          >
            Explore Resources
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}