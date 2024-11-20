import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
  json,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PostForm from '../src/components/PostForm';
import { PostProps } from "../src/types"

export const action = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  const post_id = params.postId
  const formData = await request.formData();
  const data = {
    ...Object.fromEntries(formData),
    'images_url': [
      'https://fastly.picsum.photos/id/399/200/300.jpg?hmac=qEzeLaSETRM-rnt81YtrfXeUeHQnjAkbWh7rc8NBaMQ'
    ]
  };

  try {
    await fetch(`${process.env.SERVER_ENDPOINT}/api/posts/${post_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return redirect(`/posts/${post_id}`);
  } catch (error) {
    console.error('Erro ao editar post:', error);
    return {
      status: 400,
      errors: { form: error }
    };
  }

};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const response = await fetch(`${process.env.SERVER_ENDPOINT}/api/posts/${params.postId}`);
  const post: PostProps = await response.json();
  if (!post) {
    throw new Response("Post not Found", { status: 404 });
  }
  return json({ post });
}

export default function NewPost() {
  const { post } = useLoaderData<typeof loader>()

  return (
    <div className="bg-gray-50 px-6 py-16 sm:py-24 lg:px-8">
      <PostForm isEditing={true} post={post} />
    </div >
  );
}