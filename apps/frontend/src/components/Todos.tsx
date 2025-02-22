'use client'

import { client } from "@/utils/client"
import { useQuery } from "@tanstack/react-query"

const getTodos = async () => {
    const res = await client.todos.$get()
    const { todos } = await res.json()
    return todos
}

const Todos = () => {
    const query = useQuery({ queryKey: ['todos'], queryFn: getTodos }) // データを取得するためのクエリ
    return (
        <div className="pb-10">
            {query.data?.map((todo) => (
                <div key={todo.id} className="max-w-[600px] mx-auto mt-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-semibold text-gray-800">{todo.title}</h3>
                    {todo.description && (
                        <p className="mt-2 text-gray-600">{todo.description}</p>
                    )}
                </div>
            ))}
        </div>
    )
}

export default Todos