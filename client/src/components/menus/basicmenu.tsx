import { Avatar } from "@mui/material"
import { BookOpen, FolderPen, Trash } from "lucide-react"
import { FC, ReactNode, useRef } from "react"
import { Link } from "react-router-dom"
import { storeDispatchType } from "../../store/store"
import { useDispatch } from "react-redux"
import { draftSampleActions } from "../../store/Draftvideo.slice"
import { modalActions } from "../../store/modal"

export const BasicMenu = () => {
  return (<ul className=" bg-base-200 flex flex-col gap-2 rounded-box w-56 max-h-60 scroll-smooth  overflow-y-scroll overflow-x-hidden">
    {[
      { cname: "lavneesh", url: "https://mui.com/static/images/avatar/2.jpg", link: "/c/lavneesh" },
      { cname: "lavneesh", url: "https://mui.com/static/images/avatar/2.jpg", link: "/c/lavneesh" },
      { cname: "lavneesh", url: "https://mui.com/static/images/avatar/2.jpg", link: "/c/lavneesh" },
      { cname: "adi", url: "https://i.pinimg.com/736x/83/4f/e6/834fe637588ed7ccca41c0ebd659e855.jpg", link: "/c/lavneesh" },
    ].map((c, i) => <CollaboratorTab key={i} name={c.cname} url={c.url} link={c.link} />)
    }
  </ul>)
}

export const ThreeDotsMenu: FC<{ _id: string, draftName: string }> = ({ _id, draftName }) => {
  return (<ul className="menu bg-base-200 rounded-box w-36">
    {
      [
        { txt: 'rename', svg: <FolderPen size={15} /> },
        { txt: 'more details', svg: <BookOpen size={15} /> },
        { txt: 'delete', svg: <Trash size={15} /> }
      ]
        .map(s => <ThreeDotTab draftName={draftName} _id={_id} key={s.txt} {...s} />)
    }
  </ul>)
}

const ThreeDotTab: FC<{ txt: string, svg: ReactNode, draftName: string, _id: string }> = ({ txt, svg, _id, draftName }) => {

  const dispatch: storeDispatchType = useDispatch()
  const renameRef = useRef<string>(draftName);
  const handleClick = () => {

    switch (txt) {
      case "delete":
        dispatch(modalActions.openMoal(
          {
            content: <></>,
            buttons: true,
            handleSubmit: () => {
              dispatch(draftSampleActions.removeDraft({ _id }))
              dispatch(modalActions.closeModal())
            },
            title: "Are you sure you want to delete!"
          }
        ))
        break;

      case 'rename':
        dispatch(modalActions.openMoal({
          content: <input onChange={(e) => {renameRef.current = e.target.value}} defaultValue={draftName} className="px-2 py-1 w-full rounded" placeholder="type new name" />,
          buttons: true,
          handleSubmit: () => {
            dispatch(draftSampleActions.updateDrafts({ id: _id, updatedDraft: { DraftName: renameRef.current } }))
            dispatch(modalActions.closeModal())
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
      <p>
        {txt}
      </p>
      {svg}
    </div>
  )
}

const CollaboratorTab = ({ name, url, link }: { name: string, url: string, link: string }) => {
  return <li><Link to={link} className="px-4 py-2 hover:bg-secondaryLight rounded-md flex gap-2">
    <Avatar src={url} >
    </Avatar>
    <p>{name}</p>
  </Link></li>
}