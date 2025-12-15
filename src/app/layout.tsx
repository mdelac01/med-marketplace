import './globals.css';
import type { Metadata } from 'next';
import { Providers } from '../components/Providers';

export const metadata: Metadata = {
  title: 'MedMarket | Medical Equipment Marketplace',
  description: 'Buy and sell new and used medical equipment.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
