"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { tasks, type Task } from "@/db/schema"
import { eq } from "drizzle-orm"
import { customAlphabet } from "nanoid"
import type { z } from "zod"

import type {
  updateTaskLabelSchema,
  updateTaskPrioritySchema,
  updateTaskStatusSchema,
} from "@/core/lib/validations/task"

// Function to generate a random number between min and max
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Function to generate a random element from an array
function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

export async function generateTasks({
  count = 100,
  reset = false,
}: {
  count?: number
  reset?: boolean
}) {
  const allTasks: Task[] = []

  for (let i = 0; i < count; i++) {
    allTasks.push({
      id:
        Number(customAlphabet("1234567890", 18)()) +
        new Date().getTime() +
        new Date().getMilliseconds() +
        new Date().getSeconds() +
        1,
      code: `TASK-${getRandomInt(1000, 9999)}`,
      title: `Task ${i + 1}`,
      status: getRandomElement(tasks.status.enumValues) ?? "todo",
      label: getRandomElement(tasks.label.enumValues) ?? "bug",
      priority: getRandomElement(tasks.priority.enumValues) ?? "low",
    })
  }

  reset && (await db.delete(tasks))

  console.log("📝 Inserting tasks", allTasks.length)

  await db.insert(tasks).values(allTasks)
}

export async function updateTaskLabel({
  id,
  label,
}: z.infer<typeof updateTaskLabelSchema>) {
  await db.update(tasks).set({ label }).where(eq(tasks.id, id))

  revalidatePath("/")
}
