import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { ThemeToggle } from '@/components/common/theme-toggle/theme-toggle';
import './globals.css';

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
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <nav>
            <ThemeToggle />
          </nav>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
