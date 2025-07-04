import { Button } from "@/components/ui/button"
import { FilePlus } from "lucide-react"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"

export function CreateTaskSheet() {
    const [submitting, setSubmitting] = useState(false);
    return (
        <Sheet open={submitting ? true : undefined} >
            <SheetTrigger asChild>
                <Button className="text-chart-3" variant="outline" disabled={submitting} size="sm">
                    <FilePlus /> Create Task
                </Button>
            </SheetTrigger>
            <SheetContent >
                <VideoTaskForm setSubmitting={setSubmitting} submitting={submitting} />
            </SheetContent>
        </Sheet>
    )
}

import { useState } from "react";
import {
    Dialog, DialogContent, DialogTrigger
} from "@/components/ui/dialog";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Check, Search } from "lucide-react";
import { VideoTaskForm } from "../pagesUi/tasksPageUI/taskForm";

const mockEditors = [
    { id: "editor1", name: "midbroyoyo1" },
    { id: "editor2", name: "Ravi" },
    { id: "editor3", name: "Nandini" },
];

type EditorSelectDialogProps = {
    value: string;
    onChange: (value: string) => void;
};

export const EditorSelectDialog = ({ value, onChange }: EditorSelectDialogProps) => {
    const [open, setOpen] = useState(false);
    const selectedEditor = mockEditors.find(e => e.name === value);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    type="button"
                    className="w-full justify-between"
                >
                    {selectedEditor ? selectedEditor.name : "Search editor"}
                    <Search className="w-4 h-4 opacity-50" />
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-md p-0 overflow-hidden">
                <Command>
                    <CommandInput placeholder="Search editors..." />
                    <CommandList>
                        <CommandEmpty>No editor found.</CommandEmpty>
                        <CommandGroup heading="Editors">
                            {mockEditors.map((editor) => (
                                <CommandItem
                                    key={editor.id}
                                    value={editor.name}
                                    onSelect={() => {
                                        onChange(editor.name);
                                        setOpen(false);
                                    }}
                                    className="flex justify-between"
                                >
                                    {editor.name}
                                    {value === editor.name && <Check className="w-4 h-4" />}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </DialogContent>
        </Dialog>
    );
};
