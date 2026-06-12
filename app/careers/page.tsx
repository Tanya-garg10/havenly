import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const values = [
  {
    title: "User-First Thinking",
    description:
      "Every decision we make starts with creating exceptional travel experiences for our users.",
  },
  {
    title: "Innovation",
    description:
      "We embrace new ideas and technologies to simplify travel planning and discovery.",
  },
  {
    title: "Collaboration",
    description:
      "Great products are built by teams that communicate openly and support one another.",
  },
  {
    title: "Growth",
    description:
      "We encourage continuous learning, curiosity, and professional development.",
  },
];

const benefits = [
  "Flexible Work Environment",
  "Career Growth Opportunities",
  "Learning & Development Resources",
  "Collaborative Team Culture",
  "Mentorship & Guidance",
  "Work-Life Balance",
];

const openings = [
  {
    role: "Frontend Developer",
    type: "Remote",
  },
  {
    role: "Backend Developer",
    type: "Remote",
  },
  {
    role: "UI/UX Designer",
    type: "Hybrid",
  },
  {
    role: "Business Analyist",
    type: "Hybrid",
  },
];

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="mb-4 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Careers at Havenly
            </span>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Build the Future of Travel With Us
            </h1>

            <p className="mt-6 text-lg text-muted-foreground">
              At Havenly, we're creating better travel experiences through
              thoughtful design, technology, and collaboration. Join a team
              passionate about helping people explore the world with confidence.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full px-8">
                View Opportunities
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8"
              >
                Learn About Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-foreground">
            Mission & Values
          </h2>

          <p className="mt-2 text-muted-foreground">
            The principles that guide our team and shape the future of Havenly.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="text-xl font-semibold">{value.title}</h3>

              <p className="mt-3 text-sm text-muted-foreground">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Work Here */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
          <h2 className="text-3xl font-bold text-foreground">
            Why Work at Havenly?
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="text-xl font-semibold">
                Meaningful Impact
              </h3>

              <p className="mt-2 text-muted-foreground">
                Help shape products that make travel easier and more enjoyable.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">
                Modern Technology
              </h3>

              <p className="mt-2 text-muted-foreground">
                Work with modern tools, frameworks, and collaborative workflows.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">
                Continuous Learning
              </h3>

              <p className="mt-2 text-muted-foreground">
                Grow your skills through mentorship, feedback, and hands-on
                experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Culture */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-foreground">
            Our Culture
          </h2>

          <p className="mt-2 text-muted-foreground">
            A supportive environment where people can do their best work.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-2xl border p-6">
            <h3 className="font-semibold">Remote Friendly</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Flexible collaboration from anywhere.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="font-semibold">Open Communication</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Transparent discussions and shared goals.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="font-semibold">Knowledge Sharing</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Learn from peers and contribute your expertise.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="font-semibold">Supportive Mentorship</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Guidance to help you succeed and grow.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-foreground">
            Benefits & Perks
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit}
              className="rounded-2xl border border-border p-5"
            >
              <p className="font-medium">{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open Positions */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-foreground">
            Open Positions
          </h2>

          <p className="mt-2 text-muted-foreground">
            Explore opportunities to join our growing team.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {openings.map((job) => (
            <div
              key={job.role}
              className="flex items-center justify-between rounded-2xl border border-border p-6"
            >
              <div>
                <h3 className="text-lg font-semibold">
                  {job.role}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {job.type}
                </p>
              </div>

              <Button variant="outline" className="rounded-full">
                Apply
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold">
            Don't See the Perfect Role?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
            We're always excited to meet passionate people who share our vision.
            Reach out and tell us how you'd like to contribute to Havenly's
            future.
          </p>

          <Button
            variant="secondary"
            size="lg"
            className="mt-8 rounded-full"
          >
            Contact Us
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}