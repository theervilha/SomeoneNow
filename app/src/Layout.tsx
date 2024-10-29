import {
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import NavBar from './components/NavBar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <NavBar />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
