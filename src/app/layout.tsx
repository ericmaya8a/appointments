import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { MainNavigation } from '@/components/common/main-navigation';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { themeMapping } from '@/theme';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Appointments',
  description: 'Appointments app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          themes={Object.keys(themeMapping)}
        >
          <MainNavigation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
