import {
  ActionFunctionArgs,
  redirect,
  json,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { isAuthenticatedRequest } from '~/src/auth/isAuthenticatedRequest';
import PostForm from '../src/components/PostForm';

export const action = async ({ request }: ActionFunctionArgs) => {
  const { isAuthenticated, userEmail } = await isAuthenticatedRequest(request);

  if (!isAuthenticated) {
    return redirect(`/login`);
  }

  const formData = await request.formData();

  const data = {
    ...Object.fromEntries(formData),
    'images_url': [
      'https://fastly.picsum.photos/id/399/200/300.jpg?hmac=qEzeLaSETRM-rnt81YtrfXeUeHQnjAkbWh7rc8NBaMQ'
    ],
    userEmail
  };

  try {
    const resp = await fetch(`${process.env.SERVER_ENDPOINT}/api/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!resp.ok) {
      throw new Error(await resp.text())
    }

    return redirect(`/`);
  } catch (error) {
    console.error('Erro ao criar post:', error);
    return {
      status: 400,
      errors: { form: error }
    };
  }
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { isAuthenticated, userEmail } = await isAuthenticatedRequest(request);

  if (!isAuthenticated) {
    return redirect(`/login`);
  }

  return json({ hasAccess: true });
}

export default function NewPost() {
  const { hasAccess } = useLoaderData<typeof loader>();

  return (
    <div className="bg-gray-50 px-6 py-16 sm:py-24 lg:px-8">
      {hasAccess && <PostForm isEditing={false} />}
    </div>
  );
}
