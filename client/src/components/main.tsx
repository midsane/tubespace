import { AssignmentTurnedIn, PendingActions, Videocam, Workspaces } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { AssignedTaskCard, TaskStatus } from "./cards/AssignedTaskCard";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';



export const Main = () => {
    const onLaptopScreen = useSelector(state => state.sidebar).onLaptopScreen;

    return (<div className={`h-full bg-zinc-900 ${onLaptopScreen ? "w-[82vw]" : "w-[90vw]"}`}>
        <div className=" h-[45%] relative rounded">
            <div className="w-[85%] rounded-3xl flex justify-between translate-x-1/2 right-1/2 p-10 h-min-10 bg-black absolute bottom-0 border border-stone-700 " >
                <div className="w-1/3 flex " >
                    <ProfileInfo Svg={<Videocam />} text1="videos uploaded" text2="121" />
                    <ProfileInfo Svg={<AssignmentTurnedIn />} text1="assigned tasks completed" text2="23" />

                </div>
                <div className="w-1/3 flex " >

                    <ProfileInfo Svg={<PendingActions />} text1="assigned tasks pending" text2="2" />
                    <ProfileInfo Svg={<Workspaces />} text1="your workspaces" text2="2" />

                </div>


                <div className="fixed flex flex-col gap-2 top-[-35px] right-1/2 translate-x-1/2 rounded-3xl w-20 h-28 ">

                    <div className="w-full h-[70%] bg-blue-200 rounded-3xl" >
                        <img src="https://i.pinimg.com/736x/83/4f/e6/834fe637588ed7ccca41c0ebd659e855.jpg"
                            className="object-cover rounded-3xl"
                        />
                    </div>

                    <p className="text-center" >username</p>
                </div>

            </div>
        </div>

    
        <div className=" h-[55%] flex justify-around items-center">
            <div className="w-[85%] h-[20%]">
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext >
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList  aria-label="lab API tabs example">
                                <Tab label="Item One" value="1" />
                                <Tab label="Item Two" value="2" />
                                <Tab label="Item Three" value="3" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">Item One</TabPanel>
                        <TabPanel value="2">Item Two</TabPanel>
                        <TabPanel value="3">Item Three</TabPanel>
                    </TabContext>
                </Box>
            </div>
            <div className="w-[85%] rounded-3xl flex justify-between p-10 h-min-10 bg-black border border-stone-700 h-[80%] items-center " >
                
                <AssignedTaskCard
                    timesRevised={0}
                    deadline="9th Feb 2025"
                    taskTitle="Edit the video"
                    status={TaskStatus.pending}
                    extraTStyle="w-[30%] h-[80%] bg-zinc-900 border-stone-700" />
                <AssignedTaskCard
                    timesRevised={2}
                    deadline="9th Feb 2025"
                    status={TaskStatus.completed}
                    taskTitle="make an engaging thumbnail"
                    extraTStyle="w-[30%] h-[80%] bg-zinc-900 border-stone-700" />
                <AssignedTaskCard 
                    timesRevised={3}
                    deadline="8th Feb 2025"
                    status={TaskStatus.completed}
                    taskTitle="frame catchy title and description"
                    extraTStyle="w-[30%] h-[80%] bg-zinc-900 border-stone-700" />
            </div>

        </div>
    </div>)
}


const ProfileInfo = ({ Svg, text1, text2 }: { Svg: React.ReactNode, text1: String, text2: String }) => {
    return (<div className="border-r-2 justify-between flex text-sm flex-col px-5 gap-2 border-stone-600">
        {Svg}
        <p>{text1}</p>
        <p>{text2}</p>
    </div>)
}