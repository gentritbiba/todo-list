import Image from "next/image";
import TodoList from "./_components/todo-list";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
        <h1 className="text-5xl font-bold">Just do it✅</h1>
        <TodoList />
    </main>
  );
}
