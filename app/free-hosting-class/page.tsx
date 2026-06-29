import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const classes = [
  {
    title: "Getting Started as a Host",
    description:
      "Learn the basics of creating listings, welcoming guests, and managing your space.",
  },
  {
    title: "Creating Great Guest Experiences",
    description:
      "Understand how to communicate effectively and deliver memorable stays.",
  },
  {
    title: "Pricing and Listings",
    description:
      "Discover strategies for setting prices and improving your property listing.",
  },
];

const benefits = [
  "Learn from experienced hosts",
  "Get practical hosting advice",
  "Improve guest communication",
  "Understand hosting best practices",
  "Build confidence as a host",
  "Connect with the Havenly community",
];

export default function JoinHostingClassPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="mb-4 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Join a Free Hosting Class
            </span>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Learn From Experienced Hosts
            </h1>

            <p className="mt-6 text-lg text-muted-foreground">
              Join free hosting sessions designed to help you learn,
              improve your listings, and create better guest experiences.
            </p>

            <div className="mt-8">
              <Button size="lg" className="rounded-full px-8">
                Register for a Class
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
          <h2 className="text-3xl font-bold text-foreground">
            Learn Hosting With Confidence
          </h2>

          <p className="mt-4 text-muted-foreground">
            Havenly classes provide guidance for both new and experienced
            hosts. Learn practical skills, hosting strategies, and best
            practices from experienced community members.
          </p>
        </div>
      </section>

      {/* Classes */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-foreground">
            Upcoming Topics
          </h2>

          <p className="mt-2 text-muted-foreground">
            Explore the subjects covered in our hosting sessions.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {classes.map((item) => (
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

      {/* Benefits */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
          <h2 className="text-3xl font-bold text-foreground">
            Why Attend a Class?
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="rounded-xl border border-border p-4"
              >
                <p className="font-medium text-foreground">
                  {benefit}
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
              Are the classes free?
            </h3>

            <p className="mt-2 text-muted-foreground">
              Yes, hosting classes are available at no cost.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="font-semibold">
              Who can join?
            </h3>

            <p className="mt-2 text-muted-foreground">
              Both new and experienced hosts are welcome.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="font-semibold">
              What topics are covered?
            </h3>

            <p className="mt-2 text-muted-foreground">
              Classes cover listings, pricing, guest communication,
              and hosting best practices.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-8 pb-16">
        <div className="rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold">
            Ready to Start Hosting?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
            Join a free hosting class and learn how to create
            exceptional experiences for your guests.
          </p>

          <Button
            variant="secondary"
            size="lg"
            className="mt-8 rounded-full"
          >
            Join Now
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}