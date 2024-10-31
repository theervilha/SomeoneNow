export interface PostProps {
    id: number,
    title: string,
    description?: string,
    category: string,
    price: string,
    created_at: string,
    images_url: string[],
}