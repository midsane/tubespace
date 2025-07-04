import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";
import {
    Dialog, DialogContent, DialogTrigger
} from "@/components/ui/dialog";
import {
    Carousel, CarouselContent, CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";
import { baseUrl } from "@/constast";
import { Input } from "@/components/ui/input";
import { EditorSelectDialog } from "@/components/dialogbox/createTaskSheet";
import { Button } from "@/components/ui/button";
import { SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator"

type FormValues = {
    taskTitle: string;
    workDescription: string;
    deadline: string;

    title: string;
    description: string;
    assignedTo: string;
    madeForKids: boolean;
    thumbnail: FileList;
};

type VideoTaskFormProps = {
    submitting: boolean;
    setSubmitting: (v: boolean) => void;
};

export const VideoTaskForm = ({ submitting, setSubmitting }: VideoTaskFormProps) => {
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            assignedTo: "",
        },
    });

    const [tags, setTags] = useState<string[]>([]);
    const [newTag, setNewTag] = useState("");
    const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string | null>(null);


    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const onSubmit = async (data: FormValues) => {
        try {
            setSubmitting(true);

            const formData = new FormData();
            formData.append("taskTitle", data.taskTitle);
            formData.append("workDescription", data.workDescription);
            formData.append("deadline", data.deadline);
            formData.append("assignedTo", data.assignedTo);
            selectedFiles.forEach((file) => formData.append("files", file));

            if (data.title) formData.append("title", data.title);
            if (data.description) formData.append("description", data.description);
            formData.append("tags", JSON.stringify(tags));
           

            formData.append("madeForKids", String(data.madeForKids));
            console.log(data.thumbnail)
            if (data.thumbnail?.[0]) {
                formData.append("thumbnail", data.thumbnail[0]);
            }

            const res = await fetch(`${baseUrl}task/create-task`, {
                method: "POST",
                credentials: "include",
                body: formData,
            });

            const result = await res.json();
            if (!res.ok) {
                throw new Error(result.message || "Task creation failed");
            }

            console.log("Task created:", result.task);
            reset();
        } catch (err: any) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-6 border h-[100dvh] overflow-y-scroll rounded-lg w-full max-w-full mx-auto">
                <h2 className="text-muted-foreground ">Task Details (required)</h2>
                <label className="font-semibold">TaskTitle</label>
                <Input {...register("taskTitle", { required: "Task title is required" })} />
                {errors.taskTitle && <span className="text-red-500 text-sm">{errors.taskTitle.message}</span>}


                <label>Work description</label>
                <Textarea {...register("workDescription", { required: "Workd description is required" })} />
                {errors.workDescription && <span className="text-red-500 text-sm">{errors.workDescription.message}</span>}

                <h2 className="text-muted-foreground ">Add video/img for editor's reference: (multiple files can be added)</h2>

                <label>Videos/Images</label>
                <Input
                    type="file"
                    multiple
                    accept="video/*,image/*"
                    onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        setSelectedFiles(prev => [...prev, ...files]);
                    }}
                />

                {selectedFiles.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-3">
                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" type="button">Preview Uploaded Files</Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl ">
                                <Carousel className="w-full relative max-w-full">
                                    <CarouselContent>
                                        {selectedFiles.map((file, idx) => {
                                            const url = URL.createObjectURL(file);
                                            const isVideo = file.type.startsWith("video");
                                            return (
                                                <CarouselItem key={idx} className="flex flex-col items-center gap-2">

                                                    <div className="flex w-full justify-between py-1">
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            className="text-sm"
                                                            onClick={() =>
                                                                setSelectedFiles((prev) => prev.filter((_, i) => i !== idx))
                                                            }
                                                        >
                                                            <Trash2 className="h-3 w-3" />
                                                            remove
                                                        </Button>

                                                    </div>

                                                    <div className="relative flex justify-center items-center w-full">
                                                        {isVideo ? (
                                                            <video src={url} controls className="max-h-[70vh] w-auto rounded-lg" />
                                                        ) : (
                                                            <img src={url} className="max-h-[70vh] w-auto rounded-lg" />
                                                        )}
                                                    </div>
                                                </CarouselItem>

                                            );
                                        })}
                                    </CarouselContent>
                                    <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10" />
                                    <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10" />
                                </Carousel>
                            </DialogContent>
                        </Dialog>
                    </div>
                )}

                <label>Deadline</label>
                <Input type="date" {...register("deadline", { required: "Deadline is required" })} />
                {errors.deadline && <span className="text-red-500 text-sm">{errors.deadline.message}</span>}

                <label>Assign to:</label>
                <Controller
                    control={control}
                    name="assignedTo"
                    rules={{ required: "Please select an editor" }}
                    render={({ field }) => (
                        <>
                            <EditorSelectDialog
                                value={field.value}
                                onChange={field.onChange}
                            />
                            {errors.assignedTo && (
                                <p className="text-red-500 text-sm">{errors.assignedTo.message}</p>
                            )}
                        </>

                    )}
                />


                <Separator />
                <h2 className="text-muted-foreground ">Youtube Video Details</h2>

                <p className="text-muted-foreground text-sm">Fill the below video details right now or before uploading... Scroll & click on Save button to save changes</p>

                <label>Title</label>
                <Input {...register("title")} />

                <label>Description</label>
                <Textarea {...register("description")} />

                <label className="font-semibold">Add Tags + :</label>
                <div className="flex gap-2 flex-wrap">
                    {tags.map((tag, idx) => (
                        <div key={idx} className="border rounded-full px-3 py-1 flex items-center gap-2">
                            <span>{tag}</span>
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => setTags(tags.filter((_, i) => i !== idx))}
                            >
                                ×
                            </Button>
                        </div>
                    ))}
                    <Input
                        placeholder="Add tag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && newTag.trim()) {
                                e.preventDefault();
                                setTags((prev) => [...prev, newTag.trim()]);
                                setNewTag("");
                            }
                        }}
                        className="w-auto"
                    />
                </div>

                <label className="font-semibold">For Kids</label>
                <Controller
                    control={control}
                    name="madeForKids"
                    defaultValue={false}
                    render={({ field }) => (
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                    )}
                />

                <label className="font-semibold">Upload Thumbnail</label>
                <Input
                    type="file"
                    accept="image/*"
                    {...register("thumbnail")}
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            setThumbnailPreviewUrl(URL.createObjectURL(file));
                        } else {
                            setThumbnailPreviewUrl(null);
                        }
                    }}
                />
                {thumbnailPreviewUrl && (
                    <div className="mt-2">
                        <p className="text-muted-foreground text-sm mb-1">Thumbnail Preview:</p>
                        <img
                            src={thumbnailPreviewUrl}
                            alt="Thumbnail Preview"
                            className="max-h-[200px] rounded-lg border"
                        />
                    </div>
                )}

                <div className="flex gap-4 justify-end pt-4">
                    <Button disabled={submitting} type="submit">Save</Button>
                    <SheetTrigger asChild>
                        <Button disabled={submitting} type="button" variant="outline" onClick={() => reset()}>Cancel</Button>
                    </SheetTrigger>
                </div>
            </form>
        </>
    );
};