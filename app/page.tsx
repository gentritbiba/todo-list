import Image from "next/image";
import TodoList from "./_components/todo-list";
import { getTodos } from "./_components/server-actions";

export default async function Home() {
  const initialList = await getTodos();
  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
        <h1 className="text-5xl font-bold">Just do it✅</h1>
        <TodoList initialList={initialList}/>
    </main>
  );
}
