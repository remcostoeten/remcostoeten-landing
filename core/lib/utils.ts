import {
  eq,
  like,
  not,
  notLike,
  type Column,
  type ColumnBaseConfig,
  type ColumnDataType,
} from "drizzle-orm"
import { toast } from "sonner"
import { twMerge } from "tailwind-merge"
import { z } from "zod"

import { ClassValue } from "../types/clsx"

export function clsx(
  ...inputs: (
    | string
    | number
    | boolean
    | null
    | undefined
    | Record<string, any>
    | any[]
  )[]
): string {
  let classes = []
  for (let i = 0; i < inputs.length; i++) {
    let input = inputs[i]
    if (!input) continue
    if (typeof input === "string" || typeof input === "number") {
      classes.push(input)
    } else if (Array.isArray(input)) {
      if (input.length) {
        let inner = clsx(...input)
        if (inner) {
          classes.push(inner)
        }
      }
    } else if (typeof input === "object") {
      for (let key in input) {
        if (input[key]) {
          classes.push(key)
        }
      }
    }
  }
  return classes.join(" ")
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function filterColumn({
  column,
  value,
}: {
  column: Column<ColumnBaseConfig<ColumnDataType, string>, object, object>
  value: string
}) {
  const [filterValue, filterVariety] = value?.split(".") ?? []

  switch (filterVariety) {
    case "contains":
      return like(column, `%${filterValue}%`)
    case "does not contain":
      return notLike(column, `%${filterValue}%`)
    case "is":
      return eq(column, filterValue)
    case "is not":
      return not(eq(column, filterValue))
    default:
      return like(column, `%${filterValue}%`)
  }
}

export function catchError(err: unknown) {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message
    })
    return toast(errors.join("\n"))
  } else if (err instanceof Error) {
    return toast(err.message)
  } else {
    return toast("Something went wrong, please try again later.")
  }
}

export function formatDate(date: string): string {
  const year = date.substring(0, 4)
  const strippedYear = year.substring(2)
  const restOfDate = date.substring(5)
  return `${restOfDate}-${strippedYear}`
}

export function hexToRGBA(hex, opacity) {
  if (!hex) {
    return `rgba(0, 0, 0, ${opacity})`;
  }

  let r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}