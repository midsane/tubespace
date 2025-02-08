import {  Description, Movie, Panorama, Videocam } from "@mui/icons-material"
import { Tooltip } from "@mui/material"

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

                <div className="w-full h-full justify-between  gap-1 flex items-center">

                    <Tooltip title={ "Video"} >
                        <Movie sx={{ color: "rgb(243, 238, 238)" }} />
                    </Tooltip>

                    <Tooltip title={ "thumbnail"} >
                        <Panorama sx={{ color: "rgb(112, 208, 246)" }} />
                    </Tooltip>

                    <Tooltip title={"description"} >
                        <Description sx={{ color: "rgb(112, 208, 246)" }} />
                    </Tooltip>
                </div>
            </div>
        )
    }



