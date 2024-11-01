import {
  type MetaFunction,
  ActionFunctionArgs,
  redirect,
} from "@remix-run/node";
import PostForm from '../src/components/PostForm';

export const meta: MetaFunction = () => {
  return [
    { title: "Someone Now" },
    { name: "description", content: "Encontre seu serviço agora" },
  ];
}

export const action = async ({
  request,
}: ActionFunctionArgs) => {
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

export default function NewPost() {
  return (
    <div className="bg-gray-50 px-6 py-16 sm:py-24 lg:px-8">
      <PostForm isEditing={false} />
    </div >
  );
}