"use client"

import { useState } from "react"
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { Button } from "../../ui/button"

type TagSelectorProps = {
  allTags: string[]
  selected: string[]
  onChange: (tags: string[]) => void
}

export default function TagSelector({
  allTags,
  selected,
  onChange,
}: TagSelectorProps) {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")

  const handleSelect = (tag: string) => {
    if (!selected.includes(tag)) {
      onChange([...selected, tag])
    }
    setInputValue("")
    setOpen(false)
  }

  const handleRemove = (tag: string) => {
    onChange(selected.filter((t) => t !== tag))
  }

  const addNewTag = async (tag: string) => {
    await fetch("/api/tags", {
      method: "POST",
      body: JSON.stringify({ name: tag }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  const handleCreate = (tag: string) => {
    handleSelect(tag)
    addNewTag(tag)
  }

  return (
    <div className="space-y-2 my-4">
      <div className="flex flex-wrap gap-2">
        {selected.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="flex items-center space-x-1"
          >
            <span>{tag}</span>
            <Button
              variant="ghost"
              size="icon"
              className="size-3 ml-1 cursor-pointer"
              onClick={() => handleRemove(tag)}
            >
              <X />
            </Button>
          </Badge>
        ))}
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button className="border p-2 rounded-md text-sm bg-background hover:bg-muted">
            + Add Tag
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              placeholder="Search or create tag..."
              value={inputValue}
              onValueChange={setInputValue}
            />
            <CommandList>
              {allTags.map((tag) => (
                <CommandItem key={tag} onSelect={() => handleSelect(tag)}>
                  {tag}
                </CommandItem>
              ))}

              {inputValue && !allTags.includes(inputValue.trim()) && (
                <CommandItem
                  className="text-muted-foreground italic"
                  onSelect={() => handleCreate(inputValue.trim())}
                >
                  Create &quot;{inputValue.trim()}&quot;
                </CommandItem>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
