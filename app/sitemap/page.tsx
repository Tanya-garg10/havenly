import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const sections = [
  {
    title: "Explore",
    description: "Discover homes, experiences, and services.",
    links: [
      { name: "Home", href: "/" },
      { name: "Experiences", href: "/experiences" },
      { name: "Services", href: "/services" },
      { name: "Favorites", href: "/favorites" },
    ],
  },
  {
    title: "Account",
    description: "Manage your account and bookings.",
    links: [
      { name: "Dashboard", href: "/dashboard" },
      { name: "Become a Host", href: "/host" },
      { name: "Add Property", href: "/host/add" },
    ],
  },
  {
    title: "Support",
    description: "Find help, resources, and support information.",
    links: [
      { name: "Help Centre", href: "/help-centre" },
      { name: "AirCover", href: "/aircover" },
      { name: "Anti-discrimination", href: "/anti-discrimination" },
      { name: "Disability Support", href: "/disability-support" },
      { name: "Cancellation Options", href: "/cancellation-options" },
      {
        name: "Report Neighbourhood Concerns",
        href: "/report-neighbourhood-concerns",
      },
    ],
  },
  {
    title: "Hosting",
    description: "Tools and resources for Havenly hosts.",
    links: [
      { name: "Become a Host", href: "/host" },
      { name: "Add Property", href: "/host/add" },
    ],
  },
  {
    title: "Company",
    description: "Learn more about Havenly and our policies.",
    links: [
      { name: "Careers", href: "/careers" },
      { name: "Privacy", href: "/privacy" },
      { name: "Terms", href: "/terms" },
      { name: "Sitemap", href: "/sitemap" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="mb-4 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Sitemap
            </span>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Find Everything in One Place
            </h1>

            <p className="mt-6 text-lg text-muted-foreground">
              Browse all major sections of Havenly, including homes,
              experiences, support resources, hosting tools, and company
              information.
            </p>
          </div>
        </div>
      </section>

      {/* Sitemap Sections */}
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <div className="space-y-12">

        {sections.map((section) => (
        <div
            key={section.title}
            className="border-b border-border pb-10 last:border-b-0"
        >
            <h2 className="text-2xl font-bold text-foreground">
            {section.title}
            </h2>

            <p className="mt-2 text-muted-foreground">
            {section.description}
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {section.links.map((link) => (
                <Link
                key={link.name}
                href={link.href}
                className="group rounded-xl border border-border p-5 transition-all hover:border-primary hover:bg-muted"
                >
                <h3 className="font-medium text-foreground group-hover:text-primary">
                    {link.name}
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                    Visit page
                </p>
                </Link>
            ))}
            </div>
        </div>
        ))}

    </div>
    </section>

      {/* Quick Access */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
          <h2 className="text-3xl font-bold text-foreground">
            Need Help Finding Something?
          </h2>

          <p className="mt-4 text-muted-foreground">
            Start with these commonly visited areas of Havenly.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <Link
              href="/properties"
              className="rounded-2xl border p-6 transition hover:bg-muted"
            >
              <h3 className="text-lg font-semibold">
                Browse Homes
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Explore available stays and accommodations.
              </p>
            </Link>

            <Link
              href="/experiences"
              className="rounded-2xl border p-6 transition hover:bg-muted"
            >
              <h3 className="text-lg font-semibold">
                Explore Experiences
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Discover activities and local adventures.
              </p>
            </Link>

            <Link
              href="/help-centre"
              className="rounded-2xl border p-6 transition hover:bg-muted"
            >
              <h3 className="text-lg font-semibold">
                Visit Help Centre
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Access support articles and assistance resources.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold">
            Ready to Explore Havenly?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
            Discover homes, experiences, support resources, and everything
            else Havenly has to offer.
          </p>

          <Link
            href="/properties"
            className="mt-8 inline-flex rounded-full bg-background px-8 py-3 font-medium text-foreground"
          >
            Explore Homes
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}