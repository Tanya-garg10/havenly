import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Enhanced Search Experience",
    description:
      "Find homes, experiences, and services faster with improved filtering and discovery tools.",
  },
  {
    title: "Host Dashboard Improvements",
    description:
      "Manage listings, reservations, and guest communication with an upgraded dashboard.",
  },
  {
    title: "Improved Booking Flow",
    description:
      "A streamlined reservation experience designed to make booking simpler and faster.",
  },
  {
    title: "Accessibility Enhancements",
    description:
      "New accessibility improvements help create a better experience for all users.",
  },
  {
    title: "Expanded Experiences Marketplace",
    description:
      "Discover more local activities and unique experiences in additional destinations.",
  },
  {
    title: "Performance Improvements",
    description:
      "Faster page loads and smoother navigation across the Havenly platform.",
  },
];

export default function NewFeaturesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="mb-4 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              New Features
            </span>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              What's New at Havenly
            </h1>

            <p className="mt-6 text-lg text-muted-foreground">
              Explore the latest improvements, platform updates, and
              enhancements designed to make your Havenly experience even
              better.
            </p>

            <div className="mt-8">
              <Button size="lg" className="rounded-full px-8">
                Explore Updates
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Update */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
          <span className="text-sm font-medium text-primary">
            Featured Update
          </span>

          <h2 className="mt-3 text-3xl font-bold text-foreground">
            Smarter Search and Discovery
          </h2>

          <p className="mt-4 text-muted-foreground">
            We've introduced improvements to search, filtering, and
            recommendations, making it easier to discover homes,
            experiences, and services that match your preferences.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-foreground">
            Recent Updates
          </h2>

          <p className="mt-2 text-muted-foreground">
            Highlights of the newest improvements available across Havenly.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="text-xl font-semibold text-foreground">
                {feature.title}
              </h3>

              <p className="mt-3 text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
          <h2 className="text-3xl font-bold text-foreground">
            Looking Ahead
          </h2>

          <p className="mt-4 text-muted-foreground">
            We're continuously working to improve Havenly through new
            features, performance enhancements, and tools that help guests
            and hosts get the most from the platform.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border p-6">
              <h3 className="font-semibold text-lg">
                Better Discovery
              </h3>

              <p className="mt-2 text-muted-foreground">
                More personalized recommendations and search experiences.
              </p>
            </div>

            <div className="rounded-2xl border p-6">
              <h3 className="font-semibold text-lg">
                Host Tools
              </h3>

              <p className="mt-2 text-muted-foreground">
                Additional management and analytics features for hosts.
              </p>
            </div>

            <div className="rounded-2xl border p-6">
              <h3 className="font-semibold text-lg">
                Platform Improvements
              </h3>

              <p className="mt-2 text-muted-foreground">
                Ongoing reliability, security, and performance updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold">
            Discover the Latest Updates
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
            Stay informed about new features and improvements as Havenly
            continues to grow.
          </p>

          <Button
            variant="secondary"
            size="lg"
            className="mt-8 rounded-full"
          >
            Explore Havenly
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}