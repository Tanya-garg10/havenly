import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const discussions = [
  {
    title: "Hosting Tips",
    description:
      "Share advice and learn best practices from experienced hosts.",
  },
  {
    title: "Guest Experiences",
    description:
      "Discuss memorable stays and discover ways to improve guest satisfaction.",
  },
  {
    title: "Property Management",
    description:
      "Learn how hosts manage listings, pricing, and maintenance.",
  },
  {
    title: "Safety & Support",
    description:
      "Discuss safety guidelines and community support resources.",
  },
  {
    title: "Local Recommendations",
    description:
      "Exchange ideas about attractions, dining, and experiences.",
  },
  {
    title: "Hosting Questions",
    description:
      "Ask questions and receive guidance from the community.",
  },
];

export default function CommunityForumPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="mb-4 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Community Forum
            </span>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Connect With the Havenly Community
            </h1>

            <p className="mt-6 text-lg text-muted-foreground">
              Join conversations with hosts and guests, share experiences,
              ask questions, and learn from the Havenly community.
            </p>

            <div className="mt-8">
              <Button size="lg" className="rounded-full px-8">
                Join Discussions
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
          <span className="text-sm font-medium text-primary">
            Featured Discussion
          </span>

          <h2 className="mt-3 text-3xl font-bold text-foreground">
            Helping Hosts Create Better Experiences
          </h2>

          <p className="mt-4 text-muted-foreground">
            Share advice, discover hosting strategies, and connect with
            other members of the Havenly community.
          </p>
        </div>
      </section>

      {/* Discussion Categories */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-foreground">
            Discussion Categories
          </h2>

          <p className="mt-2 text-muted-foreground">
            Browse topics and participate in community discussions.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {discussions.map((discussion) => (
            <div
              key={discussion.title}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="text-xl font-semibold text-foreground">
                {discussion.title}
              </h3>

              <p className="mt-3 text-muted-foreground">
                {discussion.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
          <h2 className="text-3xl font-bold text-foreground">
            Community Guidelines
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border p-6">
              <h3 className="text-lg font-semibold">
                Be Respectful
              </h3>

              <p className="mt-2 text-muted-foreground">
                Treat all community members with kindness and respect.
              </p>
            </div>

            <div className="rounded-2xl border p-6">
              <h3 className="text-lg font-semibold">
                Share Knowledge
              </h3>

              <p className="mt-2 text-muted-foreground">
                Help others by sharing experiences and practical advice.
              </p>
            </div>

            <div className="rounded-2xl border p-6">
              <h3 className="text-lg font-semibold">
                Stay Constructive
              </h3>

              <p className="mt-2 text-muted-foreground">
                Encourage meaningful discussions and positive interactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Topics */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-foreground">
            Popular Topics
          </h2>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border p-6">
            <h3 className="font-semibold">
              How can hosts improve guest experiences?
            </h3>
            <p className="mt-2 text-muted-foreground">
              Community members share recommendations and successful practices.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="font-semibold">
              Tips for first-time hosts
            </h3>
            <p className="mt-2 text-muted-foreground">
              Experienced hosts provide guidance for new members.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="font-semibold">
              Creating memorable stays
            </h3>
            <p className="mt-2 text-muted-foreground">
              Discussions about amenities, communication, and hospitality.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-8 pb-16">
        <div className="rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold">
            Join the Conversation
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
            Connect with hosts and guests, share your experiences,
            and become part of the Havenly community.
          </p>

          <Button
            variant="secondary"
            size="lg"
            className="mt-8 rounded-full"
          >
            Visit the Forum
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}