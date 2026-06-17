import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function CompanyDetailsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="mb-4 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Company Details
            </span>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              About Havenly
            </h1>

            <p className="mt-6 text-lg text-muted-foreground">
              Havenly is a travel and accommodation platform dedicated to
              helping guests discover memorable stays and experiences while
              empowering hosts to share their spaces with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
          <h2 className="text-3xl font-bold text-foreground">
            Company Overview
          </h2>

          <p className="mt-4 text-muted-foreground">
            Havenly connects travelers with unique accommodations,
            experiences, and services. Our goal is to make travel more
            accessible, enjoyable, and personalized while supporting
            responsible hosting and community engagement.
          </p>

          <p className="mt-4 text-muted-foreground">
            Through innovative technology and customer-focused design,
            Havenly helps create meaningful travel experiences for guests
            and sustainable opportunities for hosts.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground">
              Our Mission
            </h2>

            <p className="mt-4 text-muted-foreground">
              To help people feel at home wherever they travel by providing
              trusted accommodations, experiences, and support.
            </p>
          </div>

          <div className="rounded-3xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground">
              Our Vision
            </h2>

            <p className="mt-4 text-muted-foreground">
              To build a global community where travel creates meaningful
              connections between people, places, and cultures.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-foreground">
            Our Values
          </h2>

          <p className="mt-2 text-muted-foreground">
            The principles that guide everything we do.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-semibold">
              Trust
            </h3>

            <p className="mt-3 text-muted-foreground">
              Building confidence through transparency, safety, and
              accountability.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-semibold">
              Community
            </h3>

            <p className="mt-3 text-muted-foreground">
              Creating meaningful connections between guests, hosts,
              and local communities.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-semibold">
              Innovation
            </h3>

            <p className="mt-3 text-muted-foreground">
              Continuously improving the travel experience through
              technology and design.
            </p>
          </div>
        </div>
      </section>

      {/* Company Information */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
          <h2 className="text-3xl font-bold text-foreground">
            Company Information
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-foreground">
                Company Name
              </h3>

              <p className="mt-2 text-muted-foreground">
                Havenly, Inc.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground">
                Industry
              </h3>

              <p className="mt-2 text-muted-foreground">
                Travel & Hospitality Technology
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground">
                Headquarters
              </h3>

              <p className="mt-2 text-muted-foreground">
                Global Operations
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground">
                Founded
              </h3>

              <p className="mt-2 text-muted-foreground">
                2026
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold">
            Learn More About Havenly
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
            Explore our platform, discover opportunities, and see how
            Havenly is helping shape the future of travel.
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