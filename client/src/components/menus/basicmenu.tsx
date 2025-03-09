import { Avatar } from "@mui/material"
import { CornerDownLeft, FolderPen, Trash } from "lucide-react"
import { FC, ReactNode, useRef } from "react"
import { Link } from "react-router-dom"
import { storeDispatchType, storeStateType } from "../../store/store"
import { useDispatch, useSelector } from "react-redux"
import { modalActions } from "../../store/modal"
import { deleteDraft, deleteWorkspace, updatedDraft, updateWorkspace } from "../../fetch/fetchForYoutuber"
import toast from "react-hot-toast"
import { youtuberDraftActions } from "../../store/youtuberStore/youtuberDraftVideos.slice"
import { youtuberWorkspacesAction } from "../../store/youtuberStore/youtuberWorspaces.slice"

export const BasicMenu = () => {
    return (<div className="relative" >
      <ul className="border-2 shadow-sm shadow-secondary border-primary bg-base-200 flex flex-col gap-2 px-1 py-2 pt-10 rounded-box w-56 max-h-60 max-[500px]:max-h-40 max-[500px]:w-40 scroll-smooth overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-accent">
    <SearchBar />
    {[
      { cname: "lavneesh", url: "https://mui.com/static/images/avatar/2.jpg", link: "/c/lavneesh" },
      { cname: "lavneesh", url: "https://mui.com/static/images/avatar/2.jpg", link: "/c/lavneesh" },
      { cname: "lavneesh", url: "https://mui.com/static/images/avatar/2.jpg", link: "/c/lavneesh" },
      { cname: "adi", url: "https://i.pinimg.com/736x/83/4f/e6/834fe637588ed7ccca41c0ebd659e855.jpg", link: "/c/lavneesh" },
    ].map((c, i) => <CollaboratorTab key={i} name={c.cname} url={c.url} link={c.link} />)
    }
  </ul>
    </div>)
}

export const ThreeDotsMenu: FC<{ _id: number, draftName: string }> = ({ _id, draftName }) => {

  return (<ul className="menu border-2 shadow-sm shadow-secondary border-primary bg-base-200 rounded-box w-36">
    {
      [
        { txt: 'rename', svg: <FolderPen size={15} /> },
        { txt: 'delete', svg: <Trash size={15} /> }
      ]
        .map(s => <ThreeDotTab draftName={draftName} _id={_id} key={s.txt} {...s} />)
    }
  </ul>)
}

const ThreeDotTab: FC<{ txt: string, svg: ReactNode, draftName: string, _id: number }> = ({ txt, svg, _id, draftName }) => {


  const dispatch: storeDispatchType = useDispatch()
  const renameRef = useRef<string>(draftName);
  const handleClick = () => {

    switch (txt) {
      case "delete":
        dispatch(modalActions.openMoal(
          {
            content: <></>,
            buttons: true,
            handleSubmit: async () => {
              const resData = await deleteDraft(_id)
              if (resData.success) {
                dispatch(youtuberDraftActions.removeDraft({ draftVideoId: _id }))
                toast.success(resData.message)
                dispatch(modalActions.closeModal())
              }
              else {
                toast.error(resData.message)
              }
            }
            ,
            title: "Are you sure you want to delete!"
          }
        ))
        break;

      case 'rename':
        dispatch(modalActions.openMoal({
          content: <input onChange={(e) => { renameRef.current = e.target.value }} defaultValue={draftName} className="px-2 py-1 w-full rounded" placeholder="type new name" />,
          buttons: true,
          handleSubmit: async () => {
            if (renameRef.current?.trim() === "")
              toast.error("name cannot be empty!")
            const resData = await updatedDraft(_id, { DraftTitle: renameRef.current })

            if (resData.success) {

              dispatch(youtuberDraftActions.updateDraftDetails({
                draftVideoId: _id,
                DraftTitle: renameRef.current
              }))
              toast.success(resData.message)
              dispatch(modalActions.closeModal())
            }
            else toast.error(resData.message)
          },
          title: "Are you sure you want to rename"
        }))
        break;

    }
  }

  return (
    <div
      onClick={handleClick}
      className="flex justify-between rounded hover:bg-secondaryLight p-2">
      <p className="text-xs sm:text-sm">
        {txt}
      </p>
      {svg}
    </div>
  )
}

const CollaboratorTab = ({ name, url, link }: { name: string, url: string, link: string }) => {
  const onLaptopScreen = useSelector((state: storeStateType) => state.sidebar).onLaptopScreen

  return <li><Link to={link} className="px-4 py-2 hover:bg-secondaryLight rounded-md flex  gap-2">
    <Avatar sx={{ width: `${onLaptopScreen ? "40px" : "20px"}`, height: `${onLaptopScreen ? "40px" : "20px"}` }} src={url} >
    </Avatar>
    <div className="flex flex-col justify-center">
    <p>{name}</p>
    <CornerDownLeft color="orange" size={12} />
    </div>
  </Link></li>
}


const SearchBar: FC<{ onSearch?: (query: string) => void }> = ({ }) => {
  const handleSearch = (_: React.ChangeEvent<HTMLInputElement>) => {
    // onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      onChange={handleSearch}
      className="p-2 w-full rounded-lg z-20 border-2 absolute top-0 left-0 focus:border-primary outline-none border-secondaryLight"
    />
  );
};


export const ThreeDotsMenuWrk: FC<{ _id: number, draftName: string }> = ({ _id, draftName }) => {

  return (<ul className="menu border-2 shadow-sm shadow-secondary border-primary bg-base-200 rounded-box w-36">
    {
      [
        { txt: 'rename', svg: <FolderPen size={15} /> },
        { txt: 'delete', svg: <Trash size={15} /> }
      ]
        .map(s => <ThreeDotTabWrk draftName={draftName} _id={_id} key={s.txt} {...s} />)
    }
  </ul>)
}

const ThreeDotTabWrk: FC<{ txt: string, svg: ReactNode, draftName: string, _id: number }> = ({ txt, svg, _id, draftName }) => {


  const dispatch: storeDispatchType = useDispatch()
  const renameRef = useRef<string>(draftName);
  const handleClick = () => {

    switch (txt) {
      case "delete":
        dispatch(modalActions.openMoal(
          {
            content: <></>,
            buttons: true,
            handleSubmit: async () => {
              const resData = await deleteWorkspace(_id)
              if (resData.success) {
                dispatch(youtuberDraftActions.setDraft(resData.data.updatedDrafts))
                dispatch(youtuberWorkspacesAction.removeWorkspaces({ workspaceId: _id }))
                toast.success(resData.message)
                dispatch(modalActions.closeModal())
              }
              else {
                toast.error(resData.message)
              }
            }
            ,
            title: "Are you sure you want to delete " + draftName + "!"
          }
        ))
        break;

      case 'rename':
        dispatch(modalActions.openMoal({
          content: <input onChange={(e) => { renameRef.current = e.target.value }} defaultValue={draftName} className="px-2 py-1 w-full rounded" placeholder="type new name" />,
          buttons: true,
          handleSubmit: async () => {
            if (renameRef.current?.trim() === "")
              toast.error("name cannot be empty!")
            const resData = await updateWorkspace(_id, { name: renameRef.current })

            if (resData.success) {

              dispatch(youtuberWorkspacesAction.updateWorkspacesDetails({
                workspaceid: _id,
                name: renameRef.current
              }))
              toast.success(resData.message)
              dispatch(modalActions.closeModal())
            }
            else toast.error(resData.message)
          },
          title: "Are you sure you want to rename " + draftName + "!"
        }))
        break;

    }
  }

  return (
    <div
      onClick={handleClick}
      className="flex justify-between rounded hover:bg-secondaryLight p-2">
      <p className="text-xs sm:text-sm">
        {txt}
      </p>
      {svg}
    </div>
  )
}