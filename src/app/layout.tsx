import { useTheme } from 'next-themes';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <html lang="sr">
      <body>
        <header className="flex items-center justify-center p-4">
          <img
            src={theme === 'dark' ? '/logo-dark.png' : '/logo-light.png'}
            alt="Gde-Kako Logo"
            className="h-16"
          />
        </header>
        {children}
      </body>
    </html>
  );
}
