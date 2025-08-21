import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Learning Path Generator',
    description: 'AI-driven, role-based upskilling with adaptive plans and verifiable sources',
    keywords: ['learning', 'AI', 'upskilling', 'education', 'training'],
    authors: [{ name: 'Learning Path Generator Team' }],
    viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="h-full">
            <body className={`${inter.className} h-full bg-gray-50`}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
