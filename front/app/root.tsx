import { Outlet } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import Layout from './src/Layout';

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css",
    integrity: "sha384-k6RqeWeci5ZR/Lv4MR0sA0FfDOMm8T3o3zCRzNh4liR10M5/PpGv6f24b3ZwM7xD",
    crossOrigin: "anonymous",
  },
];

export default function App() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}
