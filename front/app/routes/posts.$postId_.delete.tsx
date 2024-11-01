import {
  ActionFunctionArgs,
  redirect,
} from "@remix-run/node";

export const action = async ({
  params,
}: ActionFunctionArgs) => {
  const post_id = params.postId

  try {
    await fetch(`${process.env.SERVER_ENDPOINT}/api/posts/${post_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });

    return redirect(`/`);
  } catch (error) {
    console.error('Erro ao deletar post:', error);
  }
};