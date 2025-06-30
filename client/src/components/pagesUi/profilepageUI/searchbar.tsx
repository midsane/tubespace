import { SearchIcon } from "lucide-react"
import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
} from "lucide-react"

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { useEffect, useState } from "react"

export const SearchBar = () => {
    const [open, setOpen] = useState(false)
    return (<div onClick={() => setOpen(!open)} className="hover:border-foreground/30 cursor-pointer active:scale-90 ease-in duration-75 rounded-lg sm:rounded-3xl py-2 sm:min-w-32 sm:max-w-36 xl:max-w-48 border-border items-center flex gap-2 px-2 sm:px-3 xl:px-4  border sm:border-2" >
        <SearchIcon size={20} />
        <CommandDialogDemo open={open} setOpen={setOpen} />
    </div>)
}

export function CommandDialogDemo({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) {


    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen(!open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    return (
        <>
            <p className="text-muted-foreground hidden sm:block text-sm">
                Press{" "}
                <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
                    <span className="text-xs">⌘</span>J
                </kbd>
            </p>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="search users!">
                        <CommandItem>
                            <Calendar />
                            <span>Calendar</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                </CommandList>
            </CommandDialog>
        </>
    )
}
