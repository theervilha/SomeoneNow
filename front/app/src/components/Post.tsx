import { PostProps } from "../types";
import { Link } from 'react-aria-components';

export default function Post({ id, title, description, price, images_url }: PostProps) {
    return (
        <div className="w-full sm:max-w-xs md:max-w-sm lg:w-[360px] lg:h-[480px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col">
            <Link href={`/posts/${id}`}>
                <img className="rounded-t-lg w-full h-[260px] object-cover" src={images_url[0]} alt="Imagem do post" />
            </Link>
            <div className="p-5 flex flex-col justify-between grow">
                <div>
                    <h5 className="mb-2 text-xl sm:text-2xl tracking-tight text-gray-900 dark:text-white">{title}</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3">{description}</p>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                        R$ {price.replace('.', ',')}
                    </span>
                    <Link href={`/posts/${id}`} className="px-3 py-2 text-sm font-medium text-white bg-indigo-700 rounded-full hover:bg-indigo-800 focus:ring-3 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
                        Chamar agora
                    </Link>
                </div>
            </div>
        </div>
    );
}
