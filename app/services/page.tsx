import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Travel Planning",
    description:
      "Personalized itineraries and travel recommendations tailored to your needs.",
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Airport Transfers",
    description:
      "Reliable airport pickup and drop-off services for a stress-free journey.",
    image:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Local Guides",
    description:
      "Discover destinations with experienced local guides and curated tours.",
    image:
      "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Concierge Support",
    description:
      "24/7 assistance to help with bookings, recommendations, and travel needs.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Group Travel",
    description:
      "Organized travel solutions for families, friends, and corporate teams.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Premium Stays",
    description:
      "Access carefully selected luxury accommodations and unique stays.",
    image:
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="mb-4 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Explore Services
            </span>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Travel Services Designed Around You
            </h1>

            <p className="mt-6 text-lg text-muted-foreground">
              From personalized planning and airport transfers to concierge
              support and guided experiences, Havenly helps make every journey
              effortless.
            </p>

            <div className="mt-8">
              <Button size="lg" className="rounded-full px-8">
                Explore Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-foreground">
            Our Services
          </h2>

          <p className="mt-2 text-muted-foreground">
            Everything you need to enjoy a smooth and memorable travel
            experience.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm text-muted-foreground">
                  {service.description}
                </p>

                <Button
                  variant="outline"
                  className="mt-5 w-full rounded-full"
                >
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Havenly */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-semibold">Trusted Support</h3>
            <p className="mt-2 text-muted-foreground">
              Assistance before, during, and after your trip.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-semibold">Verified Partners</h3>
            <p className="mt-2 text-muted-foreground">
              Carefully selected providers and travel experiences.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-semibold">Seamless Experience</h3>
            <p className="mt-2 text-muted-foreground">
              Designed to make travel planning simple and stress-free.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold">
            Ready to Enhance Your Journey?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
            Explore Havenly services and discover smarter, more convenient ways
            to travel.
          </p>

          <Button
            variant="secondary"
            size="lg"
            className="mt-8 rounded-full"
          >
            Get Started
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}