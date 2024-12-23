import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import React from 'react';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { theme } from '../theme';

export const metadata = {
  title: 'CubCourses',
  description: 'I am using Mantine with Next.js!',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem 8rem' }}>
          <div style={{ width: '70rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <MantineProvider theme={theme}>{children}</MantineProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
