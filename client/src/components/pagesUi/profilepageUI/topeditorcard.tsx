import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const TopEditorCard = () => {
    return (<Card >
        <CardHeader  >
            <div className="flex w-full gap-2  items-center">
                <img
                    className="object-cover w-10 aspect-square rounded-full border-2 border-sidebar-border"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl3hM7q8okYUEKE0G3MlPmfz8My4Yu2ONgsQ&s"
                />
                <div className="flex gap-2 justify-center flex-col">
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </div>
            </div>
        </CardHeader>
    </Card>)
}