import { Outlet } from "@remix-run/react";
import type { LinksFunction, MetaFunction, } from "@remix-run/node";

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
];

export const meta: MetaFunction = () => {
  return [
    { title: "Someone Now" },
    { name: "description", content: "Encontre seu serviço agora" },
  ];
};

export default function App() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}
