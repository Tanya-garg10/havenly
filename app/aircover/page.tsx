import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const protections = [
  {
    title: "Booking Protection",
    description:
      "Get assistance when unexpected issues affect your reservation.",
  },
  {
    title: "Check-In Support",
    description:
      "Receive help if you experience difficulties accessing your accommodation.",
  },
  {
    title: "Travel Assistance",
    description:
      "Support resources designed to help you during your journey.",
  },
];

const benefits = [
  {
    title: "Reservation Assistance",
    description:
      "Dedicated support when booking-related issues arise.",
  },
  {
    title: "Reliable Support",
    description:
      "Access help from our team whenever you need guidance.",
  },
  {
    title: "Peace of Mind",
    description:
      "Travel knowing support is available throughout your experience.",
  },
];

export default function AirCoverPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="mb-4 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              AirCover
            </span>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Travel With Confidence
            </h1>

            <p className="mt-6 text-lg text-muted-foreground">
              AirCover is designed to provide additional support and
              reassurance throughout your Havenly journey. Whether you're
              booking your stay or already traveling, help is available
              when you need it.
            </p>

            <div className="mt-8">
              <Button size="lg" className="rounded-full px-8">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Features */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-foreground">
            What's Included
          </h2>

          <p className="mt-2 text-muted-foreground">
            Key support features available through AirCover.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {protections.map((item) => (
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

      {/* Why AirCover */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
          <h2 className="text-3xl font-bold text-foreground">
            Why AirCover Matters
          </h2>

          <p className="mt-4 text-muted-foreground">
            Travel plans don't always go exactly as expected. AirCover
            provides access to support resources and guidance to help
            travelers navigate unexpected situations confidently.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {benefits.map((item) => (
              <div key={item.title}>
                <h3 className="text-xl font-semibold">
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

      {/* Coverage Highlights */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-foreground">
            Coverage Highlights
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-semibold">
              Before Your Trip
            </h3>

            <p className="mt-3 text-muted-foreground">
              Access booking guidance and information before your
              journey begins.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-semibold">
              During Your Stay
            </h3>

            <p className="mt-3 text-muted-foreground">
              Receive assistance if unexpected travel concerns arise.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-semibold">
              Reservation Support
            </h3>

            <p className="mt-3 text-muted-foreground">
              Get help resolving reservation-related issues.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-semibold">
              Ongoing Assistance
            </h3>

            <p className="mt-3 text-muted-foreground">
              Connect with support resources whenever guidance is needed.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-semibold">
              Reliable Support
            </h3>

            <p className="mt-2 text-muted-foreground">
              Dedicated resources designed to improve traveler confidence.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-semibold">
              Traveler Focused
            </h3>

            <p className="mt-2 text-muted-foreground">
              Built around the needs and expectations of modern travelers.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-semibold">
              Trusted Experience
            </h3>

            <p className="mt-2 text-muted-foreground">
              Helping create smoother and more dependable journeys.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold">
            Explore AirCover
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
            Learn how AirCover helps make every Havenly experience
            smoother, safer, and more reliable.
          </p>

          <Button
            variant="secondary"
            size="lg"
            className="mt-8 rounded-full"
          >
            Learn More
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}