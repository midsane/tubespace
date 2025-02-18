import { Avatar } from "@mui/material"
import { BookOpen, FolderPen, Trash } from "lucide-react"
import { FC, ReactNode } from "react"
import { Link } from "react-router-dom"
import { storeDispatchType } from "../../store/store"
import { useDispatch } from "react-redux"
import { draftSampleActions } from "../../store/Draftvideo.slice"

export const BasicMenu = () => {
  return (<ul className="menu bg-base-200 rounded-box w-56">
    {[
      { cname: "lavneesh", url: "https://mui.com/static/images/avatar/2.jpg", link: "/c/lavneesh" },
      { cname: "lavneesh", url: "https://mui.com/static/images/avatar/2.jpg", link: "/c/lavneesh" },
      { cname: "lavneesh", url: "https://mui.com/static/images/avatar/2.jpg", link: "/c/lavneesh" },
      { cname: "adi", url: "https://i.pinimg.com/736x/83/4f/e6/834fe637588ed7ccca41c0ebd659e855.jpg", link: "/c/lavneesh" },
    ].map((c, i) => <CollaboratorTab key={i} name={c.cname} url={c.url} link={c.link} />)
    }
  </ul>)
}

export const ThreeDotsMenu: FC<{_id: string}> = ({ _id }) => {
  return (<ul className="menu bg-base-200 rounded-box w-36">
    {
      [
        { txt: 'rename', svg: <FolderPen size={15} /> },
        { txt: 'more details', svg: <BookOpen size={15} /> },
        { txt: 'delete', svg: <Trash size={15} /> }
      ]
        .map(s => <ThreeDotTab _id={_id} key={s.txt} {...s} />)
    }
  </ul>)
}

const ThreeDotTab: FC<{ txt: string, svg: ReactNode, _id: string }> = ({ txt, svg, _id }) => {

  const dispatch: storeDispatchType = useDispatch()
  const handleClick = () => {
    console.log(txt)
    switch (txt) {
      case "delete":
        console.log('coming her')
        dispatch(draftSampleActions.removeDraft({ _id }))

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
  return <li><Link to={link} className="flex gap-2">
    <Avatar src={url} >
    </Avatar>
    <p>{name}</p>
  </Link></li>
}