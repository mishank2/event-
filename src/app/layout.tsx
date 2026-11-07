import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopHeader } from '@/components/layout/TopHeader';
import { Footer } from '@/components/layout/Footer';
import { DemoBanner } from '@/components/ui/DemoBanner';
import { EnquiryModal } from '@/components/enquiry/EnquiryModal';
import { ToastContainer } from '@/components/ui/ToastContainer';

export const metadata: Metadata = {
  title: 'Gatherly | Wedding Event Planning Dashboard & Marketplace (Ahmedabad)',
  description:
    'Discover Ahmedabad’s finest party plots, marriage halls, banquet halls, caterers, and wedding specialists. Handpicked luxury venues along Sindhu Bhavan Road, SG Highway, and Bodakdev with private concierge booking assistance.',
  keywords: [
    'Ahmedabad Wedding Dashboard',
    'Ahmedabad Party Plots',
    'Sindhu Bhavan Road Venues',
    'Marriage Halls Ahmedabad',
    'SG Highway Banquet Halls',
    'Gujarati Wedding Caterers',
    'Gatherly Events',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FBF9F5] text-charcoal flex">
        {/* Left Vertical App Icon Sidebar (matching screenshot) */}
        <Sidebar />

        {/* Right Main Dashboard / Application Canvas */}
        <div className="flex-1 flex flex-col min-w-0 lg:pl-18">
          <DemoBanner />
          <TopHeader />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>

        <EnquiryModal />
        <ToastContainer />
      </body>
    </html>
  );
}
