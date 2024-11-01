import {
  type MetaFunction,
  ActionFunctionArgs,
  redirect,
} from "@remix-run/node";
import {
  TextField,
  TextArea,
  Label,
  Input,
  Button,
  Select,
  SelectValue,
  Popover,
  ListBox,
  ListBoxItem,
  FieldError,
} from 'react-aria-components';
import {
  Form,
} from "@remix-run/react";

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

      <Form
        id="post-form"
        method="post"
        className="mx-auto max-w-5xl space-y-8 bg-white p-8 rounded-lg shadow-md"
      >
        <TextField className="mb-5" name="title" isRequired>
          <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Título</Label>
          <Input className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
          <FieldError className="text-red-500 text-sm mt-1" />
        </TextField>
        <TextField className="mb-5" name="description">
          <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição</Label>
          <TextArea className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
          <FieldError className="text-red-500 text-sm mt-1" />
        </TextField>

        <Select className="mb-5" name="category" isRequired>
          <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categoria do serviço</Label>
          <Button className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5 hover:bg-gray-100 transition duration-200 ease-in-out">
            <SelectValue />
            <span aria-hidden="true">▼</span>
          </Button>
          <FieldError className="text-red-500 text-sm mt-1" />
          <Popover>
            <ListBox className="bg-white border border-gray-300 rounded-lg shadow-lg mt-1">
              <ListBoxItem className="px-4 py-2 text-gray-900 hover:bg-blue-500 hover:text-white cursor-pointer" id="Construção">Construção</ListBoxItem>
              <ListBoxItem className="px-4 py-2 text-gray-900 hover:bg-blue-500 hover:text-white cursor-pointer" id="Manutenção">Manutenção</ListBoxItem>
              <ListBoxItem className="px-4 py-2 text-gray-900 hover:bg-blue-500 hover:text-white cursor-pointer" id="Limpeza">Limpeza</ListBoxItem>
              <ListBoxItem className="px-4 py-2 text-gray-900 hover:bg-blue-500 hover:text-white cursor-pointer" id="Beleza e Bem-Estar">Beleza e Bem-Estar</ListBoxItem>
              <ListBoxItem className="px-4 py-2 text-gray-900 hover:bg-blue-500 hover:text-white cursor-pointer" id="Tecnologia">Tecnologia</ListBoxItem>
              <ListBoxItem className="px-4 py-2 text-gray-900 hover:bg-blue-500 hover:text-white cursor-pointer" id="Transporte">Transporte</ListBoxItem>
              <ListBoxItem className="px-4 py-2 text-gray-900 hover:bg-blue-500 hover:text-white cursor-pointer" id="Pet Care">Pet Care</ListBoxItem>
              <ListBoxItem className="px-4 py-2 text-gray-900 hover:bg-blue-500 hover:text-white cursor-pointer" id="Outro">Outro</ListBoxItem>
            </ListBox>
          </Popover>
        </Select>


        <TextField className="mb-5" name="price" isRequired>
          <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Preço</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <span>R$</span>
            </div>
            <Input
              type="number"
              min="0"
              step=".01"
              className="block shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10"
            />
          </div>
          <FieldError className="text-red-500 text-sm mt-1" />
        </TextField>

        <Button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Anunciar agora</Button>
      </Form>
    </div >
  );
}