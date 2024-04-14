import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

import { ClassValue } from "../types/clsx";

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
  let classes = [];
  for (let i = 0; i < inputs.length; i++) {
    let input = inputs[i];
    if (!input) continue;
    if (typeof input === "string" || typeof input === "number") {
      classes.push(input);
    } else if (Array.isArray(input)) {
      if (input.length) {
        let inner = clsx(...input);
        if (inner) {
          classes.push(inner);
        }
      }
    } else if (typeof input === "object") {
      for (let key in input) {
        if (input[key]) {
          classes.push(key);
        }
      }
    }
  }
  return classes.join(" ");
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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

export function formatDate(date: string): string {
  const year = date.substring(0, 4);
  const strippedYear = year.substring(2);
  const restOfDate = date.substring(5);
  return `${restOfDate}-${strippedYear}`;
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

export function lightenColor(color: string, percent: number) {
  const num = parseInt(color.replace("#", ""), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    G = ((num >> 8) & 0x00ff) + amt,
    B = (num & 0x0000ff) + amt;
  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
}
