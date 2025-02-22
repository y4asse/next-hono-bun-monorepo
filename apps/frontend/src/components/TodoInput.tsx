import { client } from "@/utils/client"
import { useQueryClient } from "@tanstack/react-query"
import { useActionState } from "react"

const TodoInput = () => {
    const queryClient = useQueryClient() // キャッシュを更新するためのクエリクライアント
    const formAction = async (prevError: string | null, formData: FormData) => {
        const title = formData.get('title') as string
        const description = formData.get('description') as string
        const res = await client.todo.$post({
            json: { title, description },
        })
        if (!res.ok) {
            const error = await res.text()
            return error
        }
        queryClient.invalidateQueries({ queryKey: ['todos'] }) // データを更新したら、キャッシュを更新する
        return null
    }
    const [error, submitAction, isPending] = useActionState(formAction, null)

    return (
        <form action={submitAction} className="flex flex-col gap-2 max-w-[600px] mx-auto mt-10">
            <label htmlFor="title" className="text-sm font-medium">Title</label>
            <input type="text" name="title" className="border-2 border-gray-300 rounded-md p-2" />
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <input type="text" name="description" className="border-2 border-gray-300 rounded-md p-2" />
            <button disabled={isPending} type="submit" className="bg-blue-500 text-white p-2 rounded-md">Submit</button>
            {error && <p className="text-red-500">{error}</p>}
        </form>
    )
}

export default TodoInput
