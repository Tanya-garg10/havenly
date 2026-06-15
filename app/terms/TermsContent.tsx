'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type Section = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

const sections: Section[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    paragraphs: [
      'These Terms of Service govern your access to and use of Havenly, including our website, mobile experiences, booking tools, messaging features, and any other related services we make available.',
      'By browsing listings, creating an account, making a reservation, or publishing a stay, you agree to these Terms and to any policies referenced within them. If you do not agree, you should not use the platform.',
    ],
  },
  {
    id: 'user-responsibilities',
    title: 'User Responsibilities',
    paragraphs: [
      'You are responsible for providing accurate account details, safeguarding your login credentials, and ensuring that any information you share on Havenly is complete and up to date.',
      'You agree to use the platform respectfully, comply with applicable laws, follow house rules, and communicate honestly with other users before, during, and after a booking.',
    ],
    bullets: [
      'Maintain accurate profile, payout, and contact information.',
      'Respect property rules, occupancy limits, and quiet hours.',
      'Use Havenly only for lawful booking and hosting activity.',
    ],
  },
  {
    id: 'booking-policies',
    title: 'Booking Policies',
    paragraphs: [
      'A booking is confirmed only after payment is successfully processed and you receive a confirmation notice from Havenly. Hosts are responsible for keeping listing details, pricing, and availability accurate.',
      'Guests should review listing descriptions carefully before booking, including amenities, accessibility notes, cancellation terms, and any region-specific restrictions that may apply.',
    ],
  },
  {
    id: 'payments',
    title: 'Payments',
    paragraphs: [
      'When you complete a reservation, you authorize Havenly or its payment partners to charge the displayed booking total, including nightly rates, cleaning fees, taxes, and any service fees shown at checkout.',
      'Host payouts may be delayed, adjusted, or withheld where necessary to investigate fraud, chargebacks, policy violations, or unresolved disputes related to a reservation.',
    ],
  },
  {
    id: 'cancellations',
    title: 'Cancellations',
    paragraphs: [
      'Cancellation outcomes depend on the policy attached to the listing at the time of booking. Refund timing may vary depending on your original payment method and the policies of external payment processors.',
      'If Havenly determines that a reservation cannot be safely fulfilled, we may cancel or modify the booking and provide a refund, travel credit, or alternative support where appropriate.',
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy',
    paragraphs: [
      'We collect and use personal information to operate the platform, process bookings, improve safety, prevent fraud, and personalize the experience for guests and hosts.',
      'Your use of Havenly is also subject to our Privacy Policy, which explains how data is collected, used, disclosed, and retained across our products and support channels.',
    ],
  },
  {
    id: 'prohibited-activities',
    title: 'Prohibited Activities',
    paragraphs: [
      'To help maintain a safe and trusted marketplace, certain activities are not allowed on Havenly. Violations may result in listing removal, account suspension, payment holds, or permanent bans.',
    ],
    bullets: [
      'Circumventing Havenly to complete off-platform bookings or payments.',
      'Posting false, misleading, discriminatory, or fraudulent content.',
      'Using bots, scrapers, or automated systems to copy platform data.',
      "Interfering with another user's stay, listing, payment, or account access.",
    ],
  },
  {
    id: 'limitation-of-liability',
    title: 'Limitation of Liability',
    paragraphs: [
      'To the fullest extent permitted by law, Havenly is not liable for indirect, incidental, special, consequential, or punitive damages arising from your use of the platform or from interactions between guests and hosts.',
      'Our role is to facilitate discovery, booking, and communication. Except where required by law, Havenly does not guarantee the conduct, quality, legality, or suitability of any listing, guest, or host.',
    ],
  },
  {
    id: 'contact-information',
    title: 'Contact Information',
    paragraphs: [
      'If you have questions about these Terms, need accessibility support, or want to report a legal or safety concern, please contact our support team and we will route your request to the appropriate team.',
      'Havenly Legal Team, 123 Market Street, Suite 800, San Francisco, CA 94105. You can also reach us at legal@havenly.example for policy-related questions.',
    ],
  },
];

const tocItems = sections.map((section, index) => ({
  ...section,
  label: `${index + 1}. ${section.title}`,
}));

export function TermsContent() {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible && visible.target && visible.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: '-18% 0px -62% 0px',
        threshold: [0.1, 0.3, 0.6],
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const y = element.getBoundingClientRect().top + window.scrollY - 124;
    window.scrollTo({ top: y, behavior: 'smooth' });
    setActiveSection(id);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8 lg:py-16">
      <div className="mb-8 md:mb-10">
        <p className="mb-3 text-sm font-medium text-muted-foreground">Havenly legal</p>
        <h1 className="text-[32px] font-bold tracking-tight text-foreground md:text-[42px]">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-muted-foreground md:text-[15px]">
          Last updated: June 5, 2026
        </p>
      </div>

      <div className="border-t border-border pt-8 md:pt-10">
        <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12">
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-3xl border border-border bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                On this page
              </p>
              <nav aria-label="Table of contents" className="space-y-1">
                {tocItems.map((section) => (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      'flex w-full items-start rounded-2xl border px-3 py-2.5 text-left text-sm transition',
                      activeSection === section.id
                        ? 'border-primary/20 bg-primary/5 text-foreground shadow-sm'
                        : 'border-transparent text-muted-foreground hover:border-border hover:bg-muted/50 hover:text-foreground'
                    )}
                    aria-current={activeSection === section.id ? true : undefined}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          <article className="rounded-[32px] border border-border bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:p-8 md:p-10 lg:p-12">
            <div className="space-y-10 text-[15px] leading-7 text-foreground/90 sm:text-base sm:leading-8">
              {sections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-32 border-b border-border pb-10 last:border-b-0 last:pb-0"
                  aria-labelledby={`${section.id}-heading`}
                >
                  <div className="mb-4">
                    <p className="mb-2 text-sm font-medium text-muted-foreground">Section {index + 1}</p>
                    <h2
                      id={`${section.id}-heading`}
                      className="text-[22px] font-semibold tracking-tight text-foreground md:text-[26px]"
                    >
                      {section.title}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  {section.bullets ? (
                    <ul className="mt-5 space-y-3 rounded-3xl border border-border bg-background px-5 py-5 text-[15px] text-foreground/90">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
