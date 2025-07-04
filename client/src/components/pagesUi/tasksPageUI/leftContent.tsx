import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { TaskCard } from "./taskcard"
import { useQuery } from "@tanstack/react-query"
import type { TaskDataType } from "@/types/types"
import { fetchTasks } from "@/httpfnc/task"

const assignedTasks = [
    {
        id: 1,
        title: "Design Review",
        assignedBy: "adi",
        assignedTo: "John Doe",
        deadline: + new Date("2024-01-15"),
        description: "Review UI mockups, make sure to follow brand guidelines and color scheme. pick the right fonts and sizes.",
        attachment: "design-files.zip",
        completed: false,
        assignedByPfp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl3hM7q8okYUEKE0G3MlPmfz8My4Yu2ONgsQ&s",
        assignedToPfp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl3hM7q8okYUEKE0G3MlPmfz8My4Yu2ONgsQ&s",
    },
    {
        id: 2,
        title: "API Integration",
        assignedBy: "adi",
        assignedTo: "Jane Smith",
        deadline: + new Date("2024-01-15"),
        description: "Connect frontend to backend",
        attachment: "api-docs.pdf",
        completed: false,
        assignedByPfp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl3hM7q8okYUEKE0G3MlPmfz8My4Yu2ONgsQ&s",
        assignedToPfp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl3hM7q8okYUEKE0G3MlPmfz8My4Yu2ONgsQ&s",
    },
]

const completedTasks = [
    {
        id: 3,
        title: "Database Setup",
        assignedBy: "adi",
        assignedTo: "Mike Johnson",
        deadline: + new Date("2024-01-15"),
        description: "Configure production database",
        attachment: "db-schema.sql",
        assignedByPfp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl3hM7q8okYUEKE0G3MlPmfz8My4Yu2ONgsQ&s",
        assignedToPfp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl3hM7q8okYUEKE0G3MlPmfz8My4Yu2ONgsQ&s",
        completed: true,
    },
    {
        id: 4,
        title: "User Authentication",
        assignedBy: "adi",
        assignedTo: "Sarah Wilson",
        assignedByPfp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl3hM7q8okYUEKE0G3MlPmfz8My4Yu2ONgsQ&s",
        assignedToPfp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl3hM7q8okYUEKE0G3MlPmfz8My4Yu2ONgsQ&s",
        deadline: + new Date("2024-01-15"),
        description: "Implement login system",
        attachment: "auth-flow.png",
        completed: true,
    },
]

export const LeftContent = () => {
    const [activeTab, setActiveTab] = useState<number>(1)
    const { data, isLoading, error } = useQuery<TaskDataType[]>({
        queryKey: ["fetchTask", activeTab],
        queryFn: () => fetchTasks(),
        enabled: true,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    let assignedTasks: TaskDataType[] = [];
    let completedTasks: TaskDataType[] = [];

    if (data) {
        assignedTasks = data.filter(task => !task.isCompleted);
        completedTasks = data.filter(task => task.isCompleted);
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
            {activeTab === 1 && assignedTasks.map((task) => (
                <TaskCard
                    loading={isLoading}
                    key={task.id}
                    {...task}
                />
            ))}
            {activeTab === 2 && completedTasks.map((task) => (
                <TaskCard
                    loading={isLoading}
                    key={task.id}
                    {...task}
                />
            ))}
        </div>
        <div className="w-full h-10" >
            <Separator orientation="horizontal" className="w-full" />
        </div>
        <div className="text-sm text-muted-foreground w-full text-center mt-2">
            {activeTab === 1 ? "Tasks currently assigned to editor/ in progress" : "All your completed tasks that were assigend to editors"}
        </div>
        <div className="text-sm text-muted-foreground w-full text-center mt-2">
            Note: Click on a task to view details.
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
                    duration: 0.3,
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


