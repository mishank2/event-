import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { EnquiryModal } from '@/components/enquiry/EnquiryModal';
import { ToastContainer } from '@/components/ui/ToastContainer';

export const metadata: Metadata = {
  title: 'Gatherly — Every Event, Beautifully Connected',
  description:
    "Ahmedabad's premier event venue & service discovery marketplace. Discover top party plots, banquet halls, conference centers, caterers, decorators, and entertainment for weddings, birthdays, corporate events, and celebrations.",
  keywords: [
    'Event venues Ahmedabad',
    'Party Plots Ahmedabad',
    'Banquet Halls Ahmedabad',
    'Corporate event venues Ahmedabad',
    'Birthday party venues Ahmedabad',
    'Event caterers Ahmedabad',
    'Event decorators Gujarat',
    'Gatherly event marketplace',
  ],
  openGraph: {
    title: 'Gatherly — Every Event, Beautifully Connected',
    description: "Ahmedabad's premier discovery marketplace for every celebration — weddings, birthdays, corporate events, and private gatherings.",
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-ivory text-ink antialiased">
        <Navbar />
        <main className="pt-[72px]">
          {children}
        </main>
        <Footer />
        <EnquiryModal />
        <ToastContainer />
      </body>
    </html>
  );
}
