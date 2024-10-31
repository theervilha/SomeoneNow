import { type MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'

import Post from '../src/components/Post';
import { PostProps } from "../src/types"

import { SearchField, Input, Button } from 'react-aria-components';

export const meta: MetaFunction = () => {
  return [
    { title: "Someone Now" },
    { name: "description", content: "Encontre seu serviço agora" },
  ];
};

function Search() {
  return (
    <div className="relative rounded-md shadow-sm">
      <SearchField>
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon className="h-6 w-6" />
        </div>
        <Input
          id="searcher"
          name="search"
          aria-label="Buscar serviço"
          placeholder="O que você está procurando?"
          className="block w-full rounded-full border-0 py-1.5 pl-12 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-100 sm:text-sm sm:leading-6"
        />
      </SearchField>
    </div>
  );
}

interface QuickSearchButtonsProps {
  button_options: Array<string>
}

function QuickSearchButtons({ button_options }: QuickSearchButtonsProps) {
  return (
    <div className="mt-6 mx-auto inline-flex rounded-md shadow-sm" role="group">
      {button_options.map((btn_item, i) => (
        <Button
          key={i}
          className={
            `px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900
            ${i === 0
              ? "rounded-s-full"
              : i === button_options.length - 1
                ? "rounded-e-full"
                : "border-t border-b"}
            hover:bg-indigo-700 hover:text-white focus:z-10 focus:ring-0 focus:ring-gray-500 focus:bg-indigo-700 focus:text-white 
            dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700`
          }
        >
          {btn_item}
        </Button>
      ))}
    </div>
  )
}


export async function loader() {
  const response = await fetch(`${process.env.SERVER_ENDPOINT}/api/posts`);
  const posts = await response.json();
  return json({ posts });
}

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Encontre seu serviço agora</h2>
      </div>
      <div className="mt-10 mx-auto w-9/12">
        <Search />
        <QuickSearchButtons button_options={["Encanador", "Eletricista", "Pedreiro", "Limpeza", "Jardinagem", "Pintor", "Babá", "Reparos gerais"]} />
      </div>

      {posts && posts.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 mx-auto">
          {posts.map((post: PostProps) => (
            <li key={post.id}>
              <Post key={post.id} {...post} />
            </li>
          ))}
        </ul>
      ) : (
        <p>Sem posts</p>
      )}
    </div>
  );
}
