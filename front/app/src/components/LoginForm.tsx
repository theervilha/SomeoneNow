import {
    TextField,
    Link,
    Label,
    Input,
    Button,
    Form,
    FieldError,
} from 'react-aria-components';

type LoginFormProps = {
    isRegisterPage: boolean;
};

export default function LoginForm({ isRegisterPage }: LoginFormProps) {

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        {isRegisterPage
                            ? 'Cadastrar sua conta'
                            : 'Entrar na sua conta'}
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <Form method="post" className="space-y-6">
                        <TextField name="email" isRequired>
                            <Label className="block text-sm/6 font-medium text-gray-900">Email</Label>
                            <div className="mt-2">
                                <Input
                                    type="email"
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                />
                            </div>
                            <FieldError className="text-red-500 text-sm mt-1" />
                        </TextField>

                        <TextField name="password" isRequired>
                            <div className="flex items-center justify-between">
                                <Label className="block text-sm/6 font-medium text-gray-900">Senha</Label>
                            </div>
                            <div className="mt-2">
                                <Input
                                    type="password"
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                />
                            </div>
                            <FieldError className="text-red-500 text-sm mt-1" />
                        </TextField>

                        <div>
                            <Button
                                type='submit'
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {isRegisterPage ? 'Cadastrar' : 'Entrar'}
                            </Button>
                        </div>
                    </Form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        {isRegisterPage ? (
                            <>
                                Já tem uma conta?&nbsp;
                                <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Faça login
                                </Link>
                            </>
                        ) : (
                            <>
                                Ainda não tem uma conta?&nbsp;
                                <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Cadastre-se
                                </Link>
                            </>
                        )}
                    </p>
                </div>
            </div>
        </>
    )
}