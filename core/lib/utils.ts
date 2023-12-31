import { twMerge } from "tailwind-merge"

import { ClassValue } from "../types/clsx"
import { toast } from "sonner"
import { z } from "zod";

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
  return twMerge(clsx(...inputs))
}

export function catchError(err: unknown) {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message;
    });
    return toast(errors.join("\n"));
  } else if (err instanceof Error) {
    return toast(err.message);
  } else {
    return toast("Something went wrong, please try again later.");
  }
}
