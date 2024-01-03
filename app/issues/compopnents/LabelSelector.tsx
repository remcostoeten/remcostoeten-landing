"use client"

import * as React from "react"
import { Button } from "@c/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@c/ui/command"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@c/ui/hover-card"
import { Label } from "@c/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@c/ui/popover"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { PopoverProps } from "@radix-ui/react-popover"

import { cn } from "@/core/lib/utils"
import { useMutationObserver } from "@/core/hooks/useMutationObserver"

type Model = {
  id: string
  name: string
  description: string
  type: string
  strengths?: string
}

type ModelSelectorProps = Omit<PopoverProps, "open" | "onOpenChange"> & {
  models: Model[]
  types: string[]
}

export const models = [
  {
    id: "c305f976-8e38-42b1-9fb7-d21b2e34f0da",
    name: "text-davinci-003",
    description:
      "Most capable GPT-3 model. Can do any task the other models can do, often with higher quality, longer output and better instruction-following. Also supports inserting completions within text.",
    type: "GPT-3",
    strengths:
      "Complex intent, cause and effect, creative generation, search, summarization for audience",
  },
  {
    id: "464a47c3-7ab5-44d7-b669-f9cb5a9e8465",
    name: "text-curie-001",
    description: "Very capable, but faster and lower cost than Davinci.",
    type: "GPT-3",
    strengths:
      "Language translation, complex classification, sentiment, summarization",
  },
]

export function ModelSelector({ models, types, ...props }: ModelSelectorProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedModel, setSelectedModel] = React.useState<Model>(models[0])
  const [peekedModel, setPeekedModel] = React.useState<Model>(models[0])

  return (
    <div className="grid gap-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <Label htmlFor="model">Model</Label>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          The model which will generate the completion. Some models are suitable
          for natural language tasks, others specialize in code. Learn more.
        </HoverCardContent>
      </HoverCard>
      <Popover open={open} onOpenChange={setOpen} {...props}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a model"
            className="w-full justify-between"
          >
            {selectedModel ? selectedModel.name : "Select a model..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[250px] p-0">
          <HoverCard>
            <HoverCardContent
              side="left"
              align="start"
              forceMount
              className="min-h-[280px]"
            >
              <div className="grid gap-2">
                <h4 className="font-medium leading-none">{peekedModel.name}</h4>
                <div className="text-sm text-muted-foreground">
                  {peekedModel.description}
                </div>
                {peekedModel.strengths ? (
                  <div className="mt-4 grid gap-2">
                    <h5 className="text-sm font-medium leading-none">
                      Strengths
                    </h5>
                    <ul className="text-sm text-muted-foreground">
                      {peekedModel.strengths}
                    </ul>
                  </div>
                ) : null}
              </div>
            </HoverCardContent>
            <Command loop>
              <CommandList className="h-[var(--cmdk-list-height)] max-h-[400px]">
                <CommandInput placeholder="Search Models..." />
                <CommandEmpty>No Models found.</CommandEmpty>
                <HoverCardTrigger />
                {types.map((type) => (
                  <CommandGroup key={type} heading={type}>
                    {models
                      .filter((model) => model.type === type)
                      .map((model) => (
                        <ModelItem
                          key={model.id}
                          model={model}
                          isSelected={selectedModel?.id === model.id}
                          onPeek={(model) => setPeekedModel(model)}
                          onSelect={() => {
                            setSelectedModel(model)
                            setOpen(false)
                          }}
                        />
                      ))}
                  </CommandGroup>
                ))}
              </CommandList>
            </Command>
          </HoverCard>
        </PopoverContent>
      </Popover>
    </div>
  )
}

interface ModelItemProps {
  model: Model
  isSelected: boolean
  onSelect: () => void
  onPeek: (model: Model) => void
}

function ModelItem({ model, isSelected, onSelect, onPeek }: ModelItemProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  useMutationObserver(ref, (mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "attributes") {
        if (mutation.attributeName === "aria-selected") {
          onPeek(model)
        }
      }
    }
  })

  return (
    <CommandItem
      key={model.id}
      onSelect={onSelect}
      ref={ref}
      className="aria-selected:bg-primary aria-selected:text-primary-foreground"
    >
      {model.name}
      <CheckIcon
        className={cn(
          "ml-auto h-4 w-4",
          isSelected ? "opacity-100" : "opacity-0"
        )}
      />
    </CommandItem>
  )
}
