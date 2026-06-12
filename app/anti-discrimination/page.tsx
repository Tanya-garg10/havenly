import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const principles = [
  {
    title: "Inclusion",
    description:
      "We strive to create an environment where everyone feels welcome and valued.",
  },
  {
    title: "Respect",
    description:
      "Every member of our community deserves dignity, fairness, and consideration.",
  },
  {
    title: "Accessibility",
    description:
      "We support equal access to experiences, opportunities, and resources.",
  },
  {
    title: "Fair Treatment",
    description:
      "Decisions and interactions should be free from bias and discrimination.",
  },
];

export default function AntiDiscriminationPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="mb-4 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Anti-Discrimination
            </span>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Everyone Belongs at Havenly
            </h1>

            <p className="mt-6 text-lg text-muted-foreground">
              Havenly is committed to fostering a welcoming and inclusive
              environment where all travelers, hosts, and community members
              are treated with respect and fairness.
            </p>

            <div className="mt-8">
              <Button size="lg" className="rounded-full px-8">
                Learn About Our Policy
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
          <h2 className="text-3xl font-bold text-foreground">
            Our Commitment
          </h2>

          <p className="mt-4 text-muted-foreground">
            Havenly does not tolerate discrimination based on race,
            ethnicity, nationality, religion, disability, age, gender,
            sexual orientation, or any other protected characteristic.
          </p>

          <p className="mt-4 text-muted-foreground">
            We believe that diverse perspectives strengthen our community
            and contribute to better experiences for everyone.
          </p>
        </div>
      </section>

      {/* Core Principles */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-foreground">
            Our Core Principles
          </h2>

          <p className="mt-2 text-muted-foreground">
            Values that guide how we build and maintain our community.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {principles.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border p-6"
            >
              <h3 className="text-xl font-semibold">
                {item.title}
              </h3>

              <p className="mt-3 text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Community Standards */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-foreground">
            Community Standards
          </h2>

          <p className="mt-2 text-muted-foreground">
            Expectations for respectful participation across Havenly.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-semibold">
              Respect Everyone
            </h3>

            <p className="mt-3 text-muted-foreground">
              Treat others with kindness, professionalism, and respect,
              regardless of background or identity.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-semibold">
              Inclusive Experiences
            </h3>

            <p className="mt-3 text-muted-foreground">
              Promote equal opportunities and welcoming experiences for
              all members of the community.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-semibold">
              Accessibility Matters
            </h3>

            <p className="mt-3 text-muted-foreground">
              Encourage accessible experiences and remove barriers
              whenever possible.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-semibold">
              Zero Tolerance
            </h3>

            <p className="mt-3 text-muted-foreground">
              Harassment, hate speech, and discriminatory behavior are
              not tolerated on the platform.
            </p>
          </div>
        </div>
      </section>

      {/* Reporting Concerns */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
          <h2 className="text-3xl font-bold text-foreground">
            Reporting Concerns
          </h2>

          <p className="mt-4 text-muted-foreground">
            If you experience or witness behavior that violates our
            anti-discrimination standards, we encourage you to report
            the incident.
          </p>

          <p className="mt-4 text-muted-foreground">
            Reports are reviewed seriously, confidentially, and fairly.
            Our goal is to maintain a safe and inclusive environment for
            everyone using Havenly.
          </p>
        </div>
      </section>

      {/* Equality Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-semibold">
              Equal Access
            </h3>

            <p className="mt-3 text-muted-foreground">
              Everyone should have equal access to opportunities and
              experiences available through Havenly.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-semibold">
              Safe Community
            </h3>

            <p className="mt-3 text-muted-foreground">
              We work continuously to foster trust, safety, and mutual
              respect throughout the platform.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-semibold">
              Continuous Improvement
            </h3>

            <p className="mt-3 text-muted-foreground">
              We regularly evaluate policies and practices to improve
              inclusivity and accessibility.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold">
            Report a Concern
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
            Help us maintain a respectful and inclusive community by
            reporting incidents that violate our standards.
          </p>

          <Button
            variant="secondary"
            size="lg"
            className="mt-8 rounded-full"
          >
            Submit Report
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}