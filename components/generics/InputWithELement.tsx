import React from "react"

import { Checkbox, Input, Label } from "@/components/ui/ui-imports"

type InputWithLabelProps = {
  label?: any
  value?: any
  placeholder?: any
  className?: any
  type?: any
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  dark?: boolean
  light?: boolean
}

const darkClasses = "text-neutral-700 border-neutral-700 placeholder-red-400 "

export default function InputWithLabel({
  label,
  type,
  className,
  value,
  placeholder,
  onChange,
  dark,
  light,
}: InputWithLabelProps) {
  const inputClass = `border-cream bg-transparent ${
    dark ? "dark-text text-neutral-700" : light ? "light-text" : ""
  } ${dark ? darkClasses : ""}`

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className={darkClasses}>{label}</label>
      <input
        type={type}
        className={`flex shrink grow basis-[0%] flex-col items-stretch justify-center self-stretch overflow-hidden text-ellipsis rounded-lg border
            border-solid px-4 py-3 text-base leading-6  shadow-sm placeholder:text-[16px] max-md:max-w-full" ${inputClass}`}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  )
}

type CheckboxWithLabelProps = {
  label?: any
  value?: any
  defaultValue?: any
  className?: any
  checked?: any
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const CheckboxWithLabel = ({
  label,
  className,
  value,
  defaultValue,
  checked,
}: CheckboxWithLabelProps) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Label>{label}</Label>
      <Checkbox value={value} checked={checked} defaultValue={defaultValue} />
    </div>
  )
}
