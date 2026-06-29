import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const supportPrograms = [
  {
    title: "Emergency Housing",
    description:
      "Temporary accommodation support during times of crisis or displacement.",
  },
  {
    title: "Community Assistance",
    description:
      "Connecting affected individuals with hosting opportunities and resources.",
  },
  {
    title: "Partner Organizations",
    description:
      "Collaboration with organizations that support people in need.",
  },
];

const situations = [
  "Natural disasters",
  "Emergency evacuations",
  "Community crises",
  "Temporary displacement",
  "Relief efforts",
  "Housing emergencies",
];

export default function EmergencyStaysPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="mb-4 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Havenly.org Emergency Stays
            </span>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Support During Times of Need
            </h1>

            <p className="mt-6 text-lg text-muted-foreground">
              Havenly.org Emergency Stays helps connect people in need
              with temporary accommodation and support resources during
              challenging situations.
            </p>

            <div className="mt-8">
              <Button size="lg" className="rounded-full px-8">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
          <h2 className="text-3xl font-bold text-foreground">
            Our Mission
          </h2>

          <p className="mt-4 text-muted-foreground">
            We aim to support individuals and communities by helping
            provide temporary housing solutions during emergencies
            and unexpected situations.
          </p>
        </div>
      </section>

      {/* Programs */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-foreground">
            Support Programs
          </h2>

          <p className="mt-2 text-muted-foreground">
            Explore the initiatives that help communities during crises.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {supportPrograms.map((program) => (
            <div
              key={program.title}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="text-xl font-semibold text-foreground">
                {program.title}
              </h3>

              <p className="mt-3 text-muted-foreground">
                {program.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Situations */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
          <h2 className="text-3xl font-bold text-foreground">
            When Emergency Support May Help
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {situations.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-border p-4"
              >
                <p className="font-medium text-foreground">
                  {item}
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
              What are Emergency Stays?
            </h3>

            <p className="mt-2 text-muted-foreground">
              Emergency Stays help provide temporary accommodation
              support during difficult circumstances.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="font-semibold">
              Who can benefit from these programs?
            </h3>

            <p className="mt-2 text-muted-foreground">
              Individuals and communities affected by emergencies,
              displacement, or crises.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="font-semibold">
              How can organizations participate?
            </h3>

            <p className="mt-2 text-muted-foreground">
              Organizations can collaborate to support housing and
              relief initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-8 pb-16">
        <div className="rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold">
            Building Stronger Communities Together
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
            Learn more about Havenly.org Emergency Stays and how
            communities can support one another during difficult times.
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