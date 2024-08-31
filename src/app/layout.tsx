import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { StoreProvider } from '@/redux/StoreProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';

const inter = Inter({ subsets: ['latin'] });

const googleClientId = process.env.GOOGLE_CLIENT_ID as string;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleOAuthProvider clientId={googleClientId}>
          <StoreProvider>
              {children}
              <Toaster />
          </StoreProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
