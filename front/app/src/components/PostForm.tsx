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
    type Key,
} from 'react-aria-components';
import {
    Form,
} from "@remix-run/react";
import { useState } from 'react';
import { PostProps } from "../types"

interface PostFormProps {
    isEditing: boolean;
    post?: PostProps
}

export default function PostForm({ isEditing, post }: PostFormProps) {
    let [title, setTitle] = useState<string>(isEditing && post?.title ? post.title : '')
    let [description, setDescription] = useState<string>(isEditing && post?.description ? post.description : '')
    let [category, setCategory] = useState<Key>(isEditing && post?.category ? post.category : '');
    let [price, setPrice] = useState<string>(isEditing && post?.price ? post.price : '')

    return (
        <Form
            id="post-form"
            method="post"
            className="mx-auto max-w-5xl space-y-8 bg-white p-8 rounded-lg shadow-md"
        >
            <TextField className="mb-5" name="title" isRequired>
                <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Título</Label>
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                <FieldError className="text-red-500 text-sm mt-1" />
            </TextField>
            <TextField className="mb-5" name="description">
                <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição</Label>
                <TextArea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                <FieldError className="text-red-500 text-sm mt-1" />
            </TextField>

            <Select
                className="mb-5"
                name="category"
                selectedKey={category}
                onSelectionChange={selected => setCategory(selected)}
                isRequired
            >
                <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categoria do serviço</Label>
                <Button className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5 hover:bg-gray-100 transition duration-200 ease-in-out">
                    <SelectValue />
                    <span aria-hidden="true">▼</span>
                </Button>
                <FieldError className="text-red-500 text-sm mt-1" />
                <Popover>
                    <ListBox className="bg-white border border-gray-300 rounded-lg shadow-lg mt-1">
                        <ListBoxItem className="px-4 py-2 text-gray-900 hover:bg-blue-500 hover:text-white cursor-pointer" key="Construção" id="Construção">Construção</ListBoxItem>
                        <ListBoxItem className="px-4 py-2 text-gray-900 hover:bg-blue-500 hover:text-white cursor-pointer" key="Manutenção" id="Manutenção">Manutenção</ListBoxItem>
                        <ListBoxItem className="px-4 py-2 text-gray-900 hover:bg-blue-500 hover:text-white cursor-pointer" key="Limpeza" id="Limpeza">Limpeza</ListBoxItem>
                        <ListBoxItem className="px-4 py-2 text-gray-900 hover:bg-blue-500 hover:text-white cursor-pointer" key="Beleza e Bem-Estar" id="Beleza e Bem-Estar">Beleza e Bem-Estar</ListBoxItem>
                        <ListBoxItem className="px-4 py-2 text-gray-900 hover:bg-blue-500 hover:text-white cursor-pointer" key="Tecnologia" id="Tecnologia">Tecnologia</ListBoxItem>
                        <ListBoxItem className="px-4 py-2 text-gray-900 hover:bg-blue-500 hover:text-white cursor-pointer" key="Transporte" id="Transporte">Transporte</ListBoxItem>
                        <ListBoxItem className="px-4 py-2 text-gray-900 hover:bg-blue-500 hover:text-white cursor-pointer" key="Pet Care" id="Pet Care">Pet Care</ListBoxItem>
                        <ListBoxItem className="px-4 py-2 text-gray-900 hover:bg-blue-500 hover:text-white cursor-pointer" key="Outro" id="Outro">Outro</ListBoxItem>
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
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <FieldError className="text-red-500 text-sm mt-1" />
            </TextField>

            <Button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                {isEditing
                    ? "Atualizar post"
                    : "Anunciar agora"
                }
            </Button>
        </Form>
    )
}