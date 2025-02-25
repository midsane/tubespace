import { useSelector } from "react-redux";
import { ScreenWrapper } from "../../components/ScreenWrapper";
import { ScreeAreaTxt } from "../../components/screenAreaTxt";
import { storeStateType } from "../../store/store";
import { Search } from "lucide-react";
import { CollaBoratorCard } from "../../components/cards/collaboratorCard";




export const CollaboratorsScreen: React.FC = () => {
    const onLaptopScreen = useSelector((state: storeStateType) => state.sidebar).onLaptopScreen;
    return (
        <ScreenWrapper>
            <div className="flex h-full relative justify-center bg-black items-center ">
                <ScreeAreaTxt border title="Collaborators" width={onLaptopScreen ? "70%" : "100%"} paddingBottom="12px" borderRadius="0px" />
                <CollaboratorArea />
            </div>
        </ScreenWrapper>
    )
}

const collaboratorArr = [
    {
        name: 'lav',
        imgUrl: 'https://mui.com/static/images/avatar/2.jpg',
        pendingTasksCnt: 2,
        AssignedTasksCnt: 4,
        completedTasksCnt: 2,
        id: "1"
    },
    {
        name: 'lav',
        imgUrl: 'https://mui.com/static/images/avatar/2.jpg',
        pendingTasksCnt: 2,
        AssignedTasksCnt: 4,
        completedTasksCnt: 2,
        id: "1"
    },
    {
        name: 'lav',
        imgUrl: 'https://mui.com/static/images/avatar/2.jpg',
        pendingTasksCnt: 2,
        AssignedTasksCnt: 4,
        completedTasksCnt: 2,
        id: "1"
    },
    {
        name: 'lav',
        imgUrl: 'https://mui.com/static/images/avatar/2.jpg',
        pendingTasksCnt: 2,
        AssignedTasksCnt: 4,
        completedTasksCnt: 2,
        id: "1"
    },
    {
        name: 'lav',
        imgUrl: 'https://mui.com/static/images/avatar/2.jpg',
        pendingTasksCnt: 2,
        AssignedTasksCnt: 4,
        completedTasksCnt: 2,
        id: "1"
    },
    {
        name: 'lav',
        imgUrl: 'https://mui.com/static/images/avatar/2.jpg',
        pendingTasksCnt: 2,
        AssignedTasksCnt: 4,
        completedTasksCnt: 2,
        id: "1"
    },
    {
        name: 'lav',
        imgUrl: 'https://mui.com/static/images/avatar/2.jpg',
        pendingTasksCnt: 2,
        AssignedTasksCnt: 4,
        completedTasksCnt: 2,
        id: "1"
    },
    {
        name: 'lav',
        imgUrl: 'https://mui.com/static/images/avatar/2.jpg',
        pendingTasksCnt: 2,
        AssignedTasksCnt: 4,
        completedTasksCnt: 2,
        id: "1"
    },
    {
        name: 'lav',
        imgUrl: 'https://mui.com/static/images/avatar/2.jpg',
        pendingTasksCnt: 2,
        AssignedTasksCnt: 4,
        completedTasksCnt: 2,
        id: "1"
    },
    {
        name: 'lav',
        imgUrl: 'https://mui.com/static/images/avatar/2.jpg',
        pendingTasksCnt: 2,
        AssignedTasksCnt: 4,
        completedTasksCnt: 2,
        id: "1"
    },
    {
        name: 'lav',
        imgUrl: 'https://mui.com/static/images/avatar/2.jpg',
        pendingTasksCnt: 2,
        AssignedTasksCnt: 4,
        completedTasksCnt: 2,
        id: "1"
    },
    {
        name: 'lav',
        imgUrl: 'https://mui.com/static/images/avatar/2.jpg',
        pendingTasksCnt: 2,
        AssignedTasksCnt: 4,
        completedTasksCnt: 2,
        id: "1"
    },
    {
        name: 'lav',
        imgUrl: 'https://mui.com/static/images/avatar/2.jpg',
        pendingTasksCnt: 2,
        AssignedTasksCnt: 4,
        completedTasksCnt: 2,
        id: "1"
    },
    {
        name: 'lav',
        imgUrl: 'https://mui.com/static/images/avatar/2.jpg',
        pendingTasksCnt: 2,
        AssignedTasksCnt: 4,
        completedTasksCnt: 2,
        id: "1"
    },
    {
        name: 'lav',
        imgUrl: 'https://mui.com/static/images/avatar/2.jpg',
        pendingTasksCnt: 2,
        AssignedTasksCnt: 4,
        completedTasksCnt: 2,
        id: "1"
    },
    {
        name: 'lav',
        imgUrl: 'https://mui.com/static/images/avatar/2.jpg',
        pendingTasksCnt: 2,
        AssignedTasksCnt: 4,
        completedTasksCnt: 2,
        id: "1"
    },
    {
        name: 'lav',
        imgUrl: 'https://mui.com/static/images/avatar/2.jpg',
        pendingTasksCnt: 2,
        AssignedTasksCnt: 4,
        completedTasksCnt: 2,
        id: "1"
    },
    {
        name: 'lav',
        imgUrl: 'https://mui.com/static/images/avatar/2.jpg',
        pendingTasksCnt: 2,
        AssignedTasksCnt: 4,
        completedTasksCnt: 2,
        id: "1"
    },
    {
        name: 'lav',
        imgUrl: 'https://mui.com/static/images/avatar/2.jpg',
        pendingTasksCnt: 2,
        AssignedTasksCnt: 4,
        completedTasksCnt: 2,
        id: "1"
    }
]

const CollaboratorArea = () => {

    const onLaptopScreen = useSelector((state: storeStateType) => state.sidebar).onLaptopScreen;

    return (<div className={`w-[90%] text-xs sm:text-sm justify-start pt-24 items-center h-full relative flex flex-col ${!onLaptopScreen ? "sm:w-[90%]" : "sm:w-[80%]"} `}>
        <div className="w-full flex items-center mb-4">
            <input
                type="text"
                placeholder="Search collaborators..."
                className="w-full p-2 border border-secondaryLight rounded-l-md focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button className="p-2 opacity-80 hover:opacity-100 bg-accent text-white rounded-r-md">
                <Search className="active:scale-90 ease-linear duration-75" />
            </button>
        </div>
        <div className="h-[90%] w-full border border-secondaryLight overflow-y-scroll scroll-smooth scrollbar-thin scrollbar-track-transparent scrollbar-thumb-accent rounded-xl grid sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3  lg:place-content-start  place-items-center gap-10 p-5">
            {collaboratorArr.map(co => (
                <CollaBoratorCard
                    {...co}
                    extraTStyle="cursor-pointer hover:opacity-100 opacity-90 bg-secondary border-secondaryLight duration-75 ease-linear"
                    key={co.id}
                />
            ))}
        </div>
    </div>)
}


