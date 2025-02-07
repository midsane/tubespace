import { WorkSpaceCard } from "../cards/WorkspaceCard"

export const WorkspaceCardSection: React.FC = () => {
    return (
        <div className="w-[85%] rounded-3xl flex justify-start gap-10 py-10 px-9  h-min-10 bg-black border border-white/10 h-[80%] items-center " >

            <WorkSpaceCard
                name="midsane office"
                pendingTasksCnt={5}
                AssignedTasksCnt={2}
                completedTasksCnt={3}
                collaborators={[
                    {
                        id: "1di",
                        name: "adi",
                        imgUrl: "https://i.pinimg.com/736x/83/4f/e6/834fe637588ed7ccca41c0ebd659e855.jpg"
                    },
                    {
                        id: "2di",
                        name: "abhi",
                        imgUrl: "https://mui.com/static/images/avatar/2.jpg"
                    },
                    {
                        id: "3di",
                        name: "lav",
                        imgUrl: "https://i.pinimg.com/736x/83/4f/e6/834fe637588ed7ccca41c0ebd659e855.jpg"
                    },
                    {
                        id: "4di",
                        name: "lav",
                        imgUrl: "https://mui.com/static/images/avatar/2.jpg"
                    },
                    {
                        id: "4di",
                        name: "lav",
                        imgUrl: "https://mui.com/static/images/avatar/2.jpg"
                    }
                ]}
                extraTStyle="w-[30%] h-[80%] bg-zinc-900 border-white/10"
            />
            <WorkSpaceCard
                name="romans office"
                pendingTasksCnt={5}
                AssignedTasksCnt={2}
                completedTasksCnt={3}
                collaborators={[
                    {
                        id: "1di",
                        name: "adi",
                        imgUrl: "https://i.pinimg.com/736x/83/4f/e6/834fe637588ed7ccca41c0ebd659e855.jpg"
                    },
                    {
                        id: "2di",
                        name: "abhi",
                        imgUrl: "https://mui.com/static/images/avatar/2.jpg"
                    },
                    {
                        id: "3di",
                        name: "lav",
                        imgUrl: "https://i.pinimg.com/736x/83/4f/e6/834fe637588ed7ccca41c0ebd659e855.jpg"
                    },
                    {
                        id: "4di",
                        name: "lav",
                        imgUrl: "https://mui.com/static/images/avatar/2.jpg"
                    },
                    {
                        id: "4di",
                        name: "lav",
                        imgUrl: "https://mui.com/static/images/avatar/2.jpg"
                    }
                ]}
                extraTStyle="w-[30%] h-[80%] bg-zinc-900 border-white/10"
            />

        </div>
    )
}