import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { EnquiryModal } from '@/components/enquiry/EnquiryModal';
import { ToastContainer } from '@/components/ui/ToastContainer';

export const metadata: Metadata = {
  title: "Gatherly | Ahmedabad's Premium Wedding & Event Planning Marketplace",
  description:
    "Discover Ahmedabad's finest wedding venues, party plots, marriage halls, banquet halls, caterers, decorators and photographers. Plan your perfect celebration with Gatherly's concierge service on Sindhu Bhavan Road, SG Highway, Bodakdev and beyond.",
  keywords: [
    'Wedding venues Ahmedabad',
    'Party Plots Ahmedabad',
    'Marriage Halls Ahmedabad',
    'Sindhu Bhavan Road venues',
    'SG Highway banquet halls',
    'Wedding caterers Ahmedabad',
    'Wedding planners Gujarat',
    'Gatherly wedding marketplace',
  ],
  openGraph: {
    title: "Gatherly — Every Celebration, Beautifully Connected.",
    description: "Ahmedabad's premium wedding & event planning marketplace. Discover top venues, vendors and wedding professionals.",
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
