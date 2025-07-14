
import { LoadingTitle } from "@/components/loadingUI/loadingTitle";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useParams } from "react-router-dom";

export const CheckProgressPage = () => {
    const { taskId } = useParams();

    const numericTaskId = taskId ? Number(taskId) : undefined;
    console.log("CheckProgressPage taskId:", numericTaskId);

    return (
        <Card className="w-screen h-screen flex items-center justify-center">
            <CardContent className="flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-bold">Check Progress</h1>
                <p className="text-lg text-center opacity-80">You can check the progress of your video upload here.</p>
                {numericTaskId ? (
                    <p className="text-sm text-gray-500">Task ID: {numericTaskId}</p>
                ) : (
                    <p className="text-sm text-red-500">No valid task ID provided.</p>
                )}
                <LoadingTitle />

                <Progress value={12} />
                <p className="text-left w-full text-sm opacity-70" >{"12% completed "}</p>

            </CardContent>
        </Card>
    );
}

