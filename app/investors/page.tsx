import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const highlights = [
  {
    title: "Global Community",
    description:
      "Havenly connects hosts and guests through unique travel experiences.",
  },
  {
    title: "Sustainable Growth",
    description:
      "Focused on long-term growth and delivering value to stakeholders.",
  },
  {
    title: "Innovation",
    description:
      "Building technology that improves travel and hosting experiences.",
  },
];

const reports = [
  {
    title: "Annual Report",
    description:
      "Overview of company performance, strategy, and growth initiatives.",
  },
  {
    title: "Quarterly Updates",
    description:
      "Regular updates on company progress and important milestones.",
  },
  {
    title: "Financial Information",
    description:
      "Information regarding company performance and operations.",
  },
];

export default function InvestorsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="mb-4 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Investors
            </span>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Investor Relations
            </h1>

            <p className="mt-6 text-lg text-muted-foreground">
              Learn about Havenly's mission, growth, innovation,
              and commitment to creating value for stakeholders.
            </p>

            <div className="mt-8">
              <Button size="lg" className="rounded-full px-8">
                View Reports
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
          <h2 className="text-3xl font-bold text-foreground">
            About Havenly
          </h2>

          <p className="mt-4 text-muted-foreground">
            Havenly is focused on building meaningful travel experiences
            while supporting hosts, guests, and local communities through
            innovative technology and responsible growth.
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-foreground">
            Company Highlights
          </h2>

          <p className="mt-2 text-muted-foreground">
            Key areas that drive Havenly's vision and growth.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
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

      {/* Reports */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
          <h2 className="text-3xl font-bold text-foreground">
            Investor Resources
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {reports.map((report) => (
              <div
                key={report.title}
                className="rounded-2xl border p-6"
              >
                <h3 className="text-lg font-semibold">
                  {report.title}
                </h3>

                <p className="mt-2 text-muted-foreground">
                  {report.description}
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
              What is Havenly's mission?
            </h3>

            <p className="mt-2 text-muted-foreground">
              Havenly aims to create meaningful travel experiences while
              supporting hosts and communities.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="font-semibold">
              Where can investors find updates?
            </h3>

            <p className="mt-2 text-muted-foreground">
              Company updates and reports are shared through investor resources.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="font-semibold">
              How does Havenly support growth?
            </h3>

            <p className="mt-2 text-muted-foreground">
              Through innovation, community building, and long-term strategy.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-8 pb-16">
        <div className="rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold">
            Learn More About Havenly
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
            Explore our vision, strategy, and commitment to long-term growth.
          </p>

          <Button
            variant="secondary"
            size="lg"
            className="mt-8 rounded-full"
          >
            Investor Resources
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}