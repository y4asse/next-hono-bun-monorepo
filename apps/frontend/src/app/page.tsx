'use client'

import Todos from "@/components/Todos";
import TodoInput from "@/components/TodoInput";

export default function Home() {
  return (
    <div className="mt-10">
      <h1 className="text-3xl font-bold text-center">Todo</h1>
      <TodoInput />
      <Todos />
    </div>
  );
}