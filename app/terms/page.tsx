import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TermsContent } from './TermsContent';

export const metadata: Metadata = {
  title: 'Terms of Service | Havenly',
  description:
    "Read Havenly's Terms of Service, including booking policies, payments, cancellations, privacy, and platform rules.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <TermsContent />
      <Footer />
    </main>
  );
}
