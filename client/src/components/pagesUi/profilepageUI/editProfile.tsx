import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm, useWatch } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useRef } from "react"
import { cn } from "@/lib/utils"

type FormValues = {
    name: string
    bio: string
    link: string
    banner?: FileList
    profilePic?: FileList
}

export function ProfileEditCard() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormValues>()

    const bannerInputRef = useRef<HTMLInputElement>(null)
    const pfpInputRef = useRef<HTMLInputElement>(null)

    const bannerFile = useWatch({ control, name: "banner" })
    const pfpFile = useWatch({ control, name: "profilePic" })

    const onSubmit = (data: FormValues) => {
        console.log("Submitted:", data)
    }

    const previewFile = (fileList?: FileList) =>
        fileList?.[0] ? URL.createObjectURL(fileList[0]) : undefined

    return (
        <Card className="w-full bg-transparent border-0 mx-auto p-4 space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Banner Upload */}
                <div
                    onClick={() => bannerInputRef.current?.click()}
                    className="relative w-full h-32 bg-muted/30 rounded-md flex items-center justify-center text-sm cursor-pointer overflow-visible"
                >
                    {bannerFile?.[0] ? (
                        <img
                            src={previewFile(bannerFile)}
                            alt="Banner preview"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-xs opacity-70">add banner</span>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        {...register("banner")}
                        ref={(e) => {
                            register("banner").ref(e)
                            bannerInputRef.current = e
                        }}
                        className="hidden"
                    />

                    {/* Profile Pic */}
                    <div
                        onClick={(e) => {
                            e.stopPropagation()
                            pfpInputRef.current?.click()
                        }}
                        className="absolute -bottom-8 left-4 w-16 h-16 rounded-full bg-muted border flex items-center justify-center text-xs cursor-pointer overflow-hidden"
                    >
                        {pfpFile?.[0] ? (
                            <img
                                src={previewFile(pfpFile)}
                                alt="PFP preview"
                                className="w-full h-full object-cover rounded-full"
                            />
                        ) : (
                            <span className="text-[10px]">add pfp</span>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            {...register("profilePic")}
                            ref={(e) => {
                                register("profilePic").ref(e)
                                pfpInputRef.current = e
                            }}
                            className="hidden"
                        />
                    </div>
                </div>

                <br />
                {/* Name */}
                <div className="flex flex-col gap-1" >
                    <Label htmlFor="name">name</Label>
                    <Input
                        id="name"
                        {...register("name", { required: "Name is required" })}
                        className={cn(errors.name && "border-red-500")}
                    />
                    {errors.name && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                {/* Bio */}
                <div className="flex flex-col gap-1">
                    <Label htmlFor="bio">bio</Label>
                    <Textarea id="bio" {...register("bio")} />
                </div>

                {/* Link */}
                <div className="flex flex-col gap-1">
                    <Label htmlFor="link">link</Label>
                    <Input id="link" {...register("link")} />
                </div>

                {/* Buttons */}
                <div className="flex justify-between pt-2">
                    <Button type="submit">save</Button>
                    <Button type="button" variant="ghost">
                        cancel
                    </Button>
                </div>
            </form>
        </Card>
    )
}
