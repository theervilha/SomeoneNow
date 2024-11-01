import type { LoaderFunctionArgs } from "@remix-run/node";
import { type MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Link, Button } from 'react-aria-components';
import {
  Form,
} from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Someone Now" },
    { name: "description", content: "Encontre seu serviço agora" },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const response = await fetch(`${process.env.SERVER_ENDPOINT}/api/posts/${params.postId}`);
  const post = await response.json();
  if (!post) {
    throw new Response("Post not Found", { status: 404 });
  }
  return json({ post });
}

export default function Post() {
  const { post } = useLoaderData<typeof loader>();

  return (
    <div className="bg-gray-50 px-6 py-16 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8 bg-white p-8 rounded-lg shadow-md relative">

        <div className="flex justify-end space-x-4 mb-4">
          <Link
            className="react-aria-Button text-blue-600 hover:text-blue-800 flex items-center space-x-1"
            href={`/posts/${post.id}/edit`}
          >
            <span>Editar</span>
          </Link>

          <Form
            action="delete"
            method="post"
            onSubmit={(event) => {
              const response = confirm(
                "Confirme: Você realmente que deletar esse post?"
              );
              if (!response) {
                event.preventDefault();
              }
            }}
          >
            <Button type="submit" className="text-red-600 hover:text-red-800 flex items-center space-x-1">
              Deletar
            </Button>
          </Form>
        </div>

        <h2 className="text-4xl font-bold sm:text-5xl">
          {post.title}
        </h2>

        <div className="flex items-center space-x-4 text-sm font-medium text-gray-500">
          <span className="px-3 py-1 bg-gray-100 rounded-full">
            Categoria: {post.category}
          </span>
          <span className="px-3 py-1 bg-gray-100 rounded-full">
            Publicado em: {format_date(post.created_at)}
          </span>
        </div>

        {post.images_url && post.images_url.length > 0 && (
          <img
            className="w-full max-h-96 rounded-lg object-cover border border-gray-200 shadow-sm"
            src={post.images_url[0]}
            alt="Imagem do post"
          />
        )}

        <p className="text-lg leading-relaxed text-gray-700">
          {post.description}
        </p>

        <div className="flex items-center justify-between mt-6">
          <span className="text-2xl font-bold text-indigo-600">
            R$ {post.price.replace('.', ',')}
          </span>
          <button className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition">
            Contratar Serviço
          </button>
        </div>
      </div>
    </div>
  );
}

const format_date = (date: string) => new Date(date).toLocaleDateString('pt-BR', {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
})
