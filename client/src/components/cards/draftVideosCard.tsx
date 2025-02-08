import {  Description, Done, Movie, Panorama, Pending, Videocam } from "@mui/icons-material"
import { Button, Tooltip } from "@mui/material"
import { CircularProgressBar } from "../ui/circularprogressbar"


const LOGO1SIZE = 18
const LOGO2SIZE = 10

interface collaboratorsCardInterface {
    extraTStyle: string,
    title: string
}

export const DraftVideosCard: React.FC<collaboratorsCardInterface> =
    ({
        extraTStyle,
        title

    }) => {
        return (
            <div className={`${extraTStyle} flex flex-col px-10 gap-2 justify-center items-center rounded-xl border relative`} >
                <div className="absolute top-[-8px] left-[-8px] border-2 rounded-full border-zinc-400">
                    <Videocam />
                </div>

                <h6 className="w-full py-4 h-1/3 flex items-start justify-start" >{title}</h6>
                <div className="flex gap-1 justify-around w-full  items-center">
                <CircularProgressBar
                    progress={66.6}                    
                    size={75}
                    strokeWidth={5}
                    gradientStart="rgb(112, 208, 246) "
                    gradientEnd="rgb(52, 163, 207)"
                    backgroundColor="rgb(98, 106, 108)"
                    textColor="rgb(112, 208, 246)"
                />

                <div className="w-full h-full justify-between items-start gap-2 flex flex-col ">
                    <Tooltip title={ "Video: pending"} >
                        <div className="flex gap-0">
                            <Movie sx={{fontSize:LOGO1SIZE,  color: "rgb(243, 238, 238)" }} />
                            <Pending sx={{ fontSize: LOGO2SIZE , color: "rgb(217, 81, 81)" }} />
                        </div>
                    </Tooltip>

                    <Tooltip title={ "thumbnail: completed"} >
                        <div className="flex gap-0 ml-4">
                            <Panorama sx={{ fontSize: LOGO1SIZE, color: "rgb(112, 208, 246)" }} />
                            <Done sx={{ fontSize: LOGO2SIZE , color: "rgb(75, 218, 75),"}} />
                        </div>
                    </Tooltip>

                    <Tooltip title={"description: completed"} >
                        <div className="flex gap-0">
                            <Description sx={{ fontSize: LOGO1SIZE, color: "rgb(112, 208, 246)" }} />
                            <Done sx={{ fontSize: LOGO2SIZE, color: "rgb(70, 217, 70)," }} />
                        </div>   
                    </Tooltip>
                </div>

                <Button variant="outlined" sx={{height:"2rem"}} >View</Button>
                </div>
            </div>
        )
    }



