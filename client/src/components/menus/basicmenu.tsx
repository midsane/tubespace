import { Avatar } from "@mui/material"
import { BookOpen, FolderPen, Trash } from "lucide-react"
import { Link } from "react-router-dom"

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

export const ThreeDotsMenu = () => {
  return (<ul className="menu bg-base-200 rounded-box w-36">
    {[{ txt: 'rename', svg: <FolderPen size={15} /> }, { txt: 'more details', svg: <BookOpen size={15} /> }, { txt: 'delete', svg: <Trash size={15} /> }].map(s =>
      <div key={s.txt} className="flex justify-between rounded hover:bg-secondaryLight p-2">
        <p>
          {s.txt}
        </p>
        {s.svg}
      </div>

    )
    }
  </ul>)
}

const CollaboratorTab = ({ name, url, link }: { name: string, url: string, link: string }) => {
  return <li><Link to={link} className="flex gap-2">
    <Avatar src={url} >
    </Avatar>
    <p>{name}</p>
  </Link></li>
}