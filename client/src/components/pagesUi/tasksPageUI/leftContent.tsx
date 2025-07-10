import { useEffect, useState } from "react"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { TaskCard } from "./taskcard"
import { useQuery } from "@tanstack/react-query"
import type { TaskDataType } from "@/types/types"
import { fetchTasks } from "@/httpfnc/task"
import { useTaskStore } from "@/store/task.store"
import { BrushCleaning } from "lucide-react"
import { useUserStore } from "@/store/user.store"


export const LeftContent = () => {
    const role = useUserStore((state) => state.user.role)
    const [activeTab, setActiveTab] = useState<number>(1)
    const { data, isLoading, error } = useQuery<TaskDataType[]>({
        queryKey: ["fetchTask", activeTab, role],
        queryFn: () => fetchTasks(),
        enabled: true,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    console.log("error:", error)
    const tasksData = useTaskStore((state) => state.tasks)
    const setTasksData = useTaskStore((state) => state.setState)


    let assignedTasks: Partial<TaskDataType>[] = [];
    let completedTasks: Partial<TaskDataType>[] = [];

    useEffect(() => {
        if (data) {
            setTasksData(data);
        }
    }, [data]);

    if (!isLoading && tasksData) {
        assignedTasks = tasksData.filter(task => !task.isCompleted);
        completedTasks = tasksData.filter(task => task.isCompleted);
    }

    return (<div className="h-full  w-full flex flex-col justify-center items-center " >
        <div className="w-full" >
            <div className="flex relative h-12 sm:h-10 w-full items-center text-xs sm:text-sm">

                <Tab
                    text="Assigned Tasks"
                    isActive={activeTab === 1}
                    onClick={() => setActiveTab(1)}
                />
                <Tab
                    text="Completed Tasks"
                    isActive={activeTab === 2}
                    onClick={() => setActiveTab(2)}
                />
            </div>
            <Separator orientation="horizontal" className="w-full" />
        </div>
        <div className="flex h-full py-5 items-center w-full flex-col gap-5 overflow-y-scroll">
            {!isLoading && activeTab === 1 && assignedTasks.map((task) => (
                <TaskCard
                    loading={isLoading}
                    key={task.id}
                    {...task}
                />
            ))}

            {!isLoading && activeTab === 1 && assignedTasks.length === 0 && (
                <div className="text-muted-foreground h-full text-sm flex flex-col gap-5 items-center justify-center">
                    <h1 className="text-lg" >No tasks currently assigned yet.</h1>
                    <BrushCleaning size={30} />

                </div>
            )}
            {!isLoading && activeTab === 2 && completedTasks.length === 0 && (
                <div className="text-muted-foreground h-full text-sm flex flex-col gap-5 items-center justify-center">
                    <h1 className="text-lg" >No completed tasks yet.</h1>
                    <BrushCleaning size={30} />

                </div>
            )}
            {isLoading && <TaskCard loading={isLoading} />}
            {isLoading && <TaskCard loading={isLoading} />}
            {!isLoading && activeTab === 2 && completedTasks.map((task) => (
                <TaskCard
                    loading={isLoading}
                    key={task.id}
                    {...task}
                />
            ))}
            {isLoading && <TaskCard loading={isLoading} />}
            {isLoading && <TaskCard loading={isLoading} />}

        </div>
        <div className="w-full h-6" >
            <Separator orientation="horizontal" className="w-full" />
        </div>
        <div className="text-xs text-muted-foreground w-full text-center mt-2">
            {activeTab === 1 ? "Tasks currently assigned to editor/ in progress" : "All your completed tasks that were assigend to editors"}
        </div>

    </div>)
}



const Tab = ({ text, isActive, onClick }: { text: string, isActive: boolean, onClick: () => void }) => {
    return (
        <>
            <motion.div
                key={text}
                onClick={onClick}
                layout
                initial="initial"
                animate="animate"
                exit="exit"
                whileHover="hover"
                variants={{
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                }}
                transition={{
                    duration: 0.1,
                    ease: "easeInOut",
                }}
                className={`
                cursor-pointer h-full flex justify-center items-center border-r px-5
                transition-colors duration-300
                ${isActive && "bg-foreground/80 text-background border-border"}
            `}
            >
                {text}
            </motion.div>
        </>
    )
}


