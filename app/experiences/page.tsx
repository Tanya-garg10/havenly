import Image from "next/image";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const experiences = [
  {
    title: "Mountain Adventure",
    description: "Guided treks through breathtaking mountain landscapes.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Food Discovery",
    description: "Taste authentic local cuisine and culinary traditions.",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Cultural Heritage Tour",
    description: "Explore history, architecture, and local traditions.",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Wildlife Safari",
    description: "Get closer to nature with unforgettable wildlife encounters.",
    image:
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Beach Escape",
    description: "Relax and recharge on stunning coastal destinations.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Wellness Retreat",
    description: "Reconnect with yourself through wellness experiences.",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
  },
];

export default function ExperiencesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="mb-4 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Explore Experiences
            </span>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Discover Extraordinary Experiences
            </h1>

            <p className="mt-6 text-lg text-muted-foreground">
              From cultural adventures to nature escapes, explore curated
              experiences designed to make every journey unforgettable.
            </p>

            <div className="mt-8">
              <Button size="lg" className="rounded-full px-8">
                Explore Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Experiences */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-foreground">
            Featured Experiences
          </h2>
          <p className="mt-2 text-muted-foreground">
            Handpicked adventures and memorable activities for every traveler.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {experiences.map((experience) => (
            <div
              key={experience.title}
              className="group overflow-hidden rounded-3xl border border-border bg-card transition-all hover:shadow-lg"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={experience.image}
                  alt={experience.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground">
                  {experience.title}
                </h3>

                <p className="mt-3 text-sm text-muted-foreground">
                  {experience.description}
                </p>

                <Button
                  variant="outline"
                  className="mt-5 rounded-full"
                >
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold">
            Ready for Your Next Adventure?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
            Browse curated experiences designed to inspire your next memorable
            journey.
          </p>

          <Button
            variant="secondary"
            size="lg"
            className="mt-8 rounded-full"
          >
            Start Exploring
          </Button>
        </div>
      </section>
    <Footer />
    </main>
  );
}