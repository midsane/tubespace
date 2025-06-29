import { SearchIcon } from "lucide-react"

export const SearchBar = () => {
    return (<div className="rounded-3xl min-w-32 max-w-36 xl:max-w-48 border-border items-center flex gap-2 px-3 xl:px-4  border-2" >
        <SearchIcon />
        <input className="bg-transparent py-1 md:py-2 outline-none w-full rounded-3xl" />
    </div>)
}