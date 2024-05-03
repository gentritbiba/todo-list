"use server"

import db from "@/lib/db"
import type { Todo } from "./todo-list"

export async function getTodos() {
  return await db.toDo.findMany()
}

export async function createTodo(data: Todo) {
  const dataInput = {
    text: data.text,
    dueDate: data.dueDate,
    completed: data.completed,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  return await db.toDo.create({ data: dataInput })
}

export async function updateTodoComplete(data: Todo) {
  return await db.toDo.update({
    where: { id: data.id },
    data: { completed: !data.completed, updatedAt: new Date()},
  })
}

export async function deleteTodoById(id: string) {
  return await db.toDo.delete({ where: { id } })
}