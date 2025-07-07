import { type TaskDataType } from '@/types/types'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface taskStore {
    tasks: Partial<TaskDataType>[],
    setState: (newState: Partial<TaskDataType>[]) => void,
    appendState: (newTask: Partial<TaskDataType>) => void
    DeleteState: (taskId: number) => void,
    resetState: () => void,
}

export const useTaskStore = create<taskStore>()(
    persist(
        (set, _) => ({
            tasks: [],
            setState: (newState) => set(() => ({ tasks: newState })),
            appendState: (newTask) => set((state) => ({ tasks: [...state.tasks, newTask] })),
            DeleteState: (taskId) => set((state) => ({ tasks: state.tasks.filter(task => task.id !== taskId) })),
            resetState: () => {
                set(() => ({ tasks: [] }));
                const storage = createJSONStorage(() => localStorage);
                storage?.removeItem('task-storage'); 
            },
        }),
        {
            name: 'task-storage',
            storage: createJSONStorage(() => localStorage),
        },
    ),
)



