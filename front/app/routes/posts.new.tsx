import {
  ActionFunctionArgs,
  redirect,
  json,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { userHasAccess, getAuthCookie } from "~/src/utils/userHasAccess";
import PostForm from '../src/components/PostForm';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = {
    ...Object.fromEntries(formData),
    'images_url': [
      'https://fastly.picsum.photos/id/399/200/300.jpg?hmac=qEzeLaSETRM-rnt81YtrfXeUeHQnjAkbWh7rc8NBaMQ'
    ]
  };

  try {
    await fetch(`${process.env.SERVER_ENDPOINT}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

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
  let hasAccess;

  const cookieHeader = request.headers.get("Cookie");
  if (cookieHeader) {
    let authToken = getAuthCookie(cookieHeader)
    hasAccess = await userHasAccess(authToken);
  }

  if (!hasAccess) {
    return redirect("/login");
  }

  return json({ hasAccess });
}

export default function NewPost() {
  const { hasAccess } = useLoaderData<typeof loader>();

  return (
    <div className="bg-gray-50 px-6 py-16 sm:py-24 lg:px-8">
      {hasAccess && <PostForm isEditing={false} />}
    </div>
  );
}
