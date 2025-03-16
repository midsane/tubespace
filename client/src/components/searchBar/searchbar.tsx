
import { Search, X } from "lucide-react"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { userInterface } from "../../types/youtuberTypes"
import { useFetch } from "../../hooks/fetchHooks"
import toast from "react-hot-toast"
import { ProfilePic, ProfileSize } from "../ui/profilePic/profilePic"
import { debounce } from "../../util/debounce"
import { useNavigate } from "react-router-dom"

interface fetchDataType {
    ytData: Partial<userInterface[]>
}

export const CommandSearch: React.FC<{
    setSearchQuery: (...args: any) => void,
    placeholder: string,
    fnc: (...args: any) => Promise<any>,
    searchQuery: string
}> = ({
    placeholder,
    fnc,
    setSearchQuery: setSq,
    searchQuery: sq
}) => {
        const [isExpanded, setIsExpanded] = useState(false)
        const searchRef = useRef<HTMLDivElement>(null)
        const inputRef = useRef<HTMLInputElement>(null)
        const [searchQuery, setSearchQuery] = useState<string>("")

        const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>(searchQuery)

        const fetchFnc = useCallback(() => fnc(debouncedSearchQuery), [debouncedSearchQuery])

        const { data: shallowYtData, loading, error } = useFetch<fetchDataType>(fetchFnc)

        const searchResult = () => {
            if (inputRef.current) {
                setSq(inputRef.current.value)
                setIsExpanded(false)
            }
        }

        if (error) toast.error(error)

        useEffect(() => {
            const debouncedFnc = debounce(() => setDebouncedSearchQuery(searchQuery), 500)
            debouncedFnc();
        }, [searchQuery])


        useEffect(() => {
            const handleKeyDown = (e: KeyboardEvent) => {
                if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                    e.preventDefault()
                    setIsExpanded(true)
                    setTimeout(() => {
                        inputRef.current?.focus()
                    }, 100)
                }

                if (e.key === "Escape" && isExpanded) {
                    setIsExpanded(false)
                }

                if (e.key === "Enter" && isExpanded && document.activeElement === inputRef.current) {
                    searchResult()
                }
            }

            window.addEventListener("keydown", handleKeyDown)
            return () => window.removeEventListener("keydown", handleKeyDown)
        }, [isExpanded])

        useEffect(() => {
            const handleClickOutside = (e: MouseEvent) => {
                if (searchRef.current && !searchRef.current.contains(e.target as Node) && isExpanded) {
                    setIsExpanded(false)
                }
            }

            document.addEventListener("mousedown", handleClickOutside)
            return () => document.removeEventListener("mousedown", handleClickOutside)
        }, [isExpanded])

        return (
            <>

                {isExpanded && (
                    <div
                        className="fixed inset-0 backdrop-blur-sm z-40 transition-opacity duration-300"
                        aria-hidden="true"
                    />
                )}

                {!isExpanded && (
                    <div className="w-full flex items-center mb-4 relative">
                        <input
                            value={sq}
                            onChange={(e) => setSq(e.target.value)}
                            type="text"
                            placeholder="Search Workspaces..."
                            className="w-full p-2 py-3 border relative border-secondaryLight rounded-l-md focus:outline-none"
                            onFocus={() => setIsExpanded(true)}
                        />
                        <button className="px-2 py-[0.6rem] sm:py-3 opacity-80 hover:opacity-100 bg-secondary border border-secondaryLight text-white rounded-r-md">
                            <Search onClick={() => setIsExpanded(true)} size={20} className="active:scale-90 ease-linear duration-75" />
                        </button>
                        <div className="gap-1 hidden sm:flex absolute bottom-1/2 translate-y-1/2 right-14">
                            <kbd style={{ fontSize: "12px" }} className="kbd">
                                ctrl
                            </kbd>
                            +
                            <kbd style={{ fontSize: "12px" }} className="kbd">
                                k
                            </kbd>
                        </div>
                    </div>
                )}


                <div
                    ref={searchRef}
                    className={`fixed left-1/2 top-1/2 shadow-sm shadow-secondaryLight -translate-x-1/2 -translate-y-1/2 w-full max-w-sm max-[460px]:max-w-xs sm:max-w-xl lg:max-w-2xl transition-all duration-300 ease-in-out opacity-0 z-0 ${isExpanded ? "z-50 scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
                        }`}
                >
                    <div className="bg-primary rounded-lg shadow-2xl overflow-hidden">
                        <div className="flex items-center p-4 border-b border-secondaryLight">
                            <Search onClick={searchResult} className="text-label mr-3" />
                            <input
                                ref={inputRef}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                type="text"
                                placeholder={placeholder}
                                className="flex-1 px-2 py-1 rounded-lg border border-secondary focus:outline-none text-lg"
                                autoFocus={isExpanded}
                            />
                            <button onClick={() => setIsExpanded(false)} className="p-1 rounded-full hover:bg-secondaryLight ease-linear duration-75">
                                <X className="text-gray-400" />
                            </button>
                        </div>

                        <div className="p-4 max-h-[60vh] overflow-y-auto">

                            <ShowTxt loading={loading} shallowYtData={shallowYtData?.ytData || []} />


                        </div>

                        <div className="bg-secondary hidden sm:block px-4 py-3 text-xs text-label opacity-60 border-t border-secondaryLight">
                            <div className="flex justify-between">

                                <div className=" items-center flex gap-2">
                                    <span>Press</span>
                                    <kbd className="px-2 py-1 bg- rounded border shadow-sm">Esc</kbd>
                                    <span>to close</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }


const ShowTxt = ({ shallowYtData, loading = false }: { loading?: boolean, shallowYtData: Partial<userInterface | undefined>[] | null }) => {
    const navigate = useNavigate()
    if (!shallowYtData || shallowYtData[0] === undefined) return null

    if (loading) return (
        <div className="text-sm text-label opacity-65 h-56 overflow-y-scroll  mb-2" >
            {[1, 2, 3, 4, 5].map(d => d &&
                <div className="bg-secondaryLight rounded-none p-2 flex justify-start items-center gap-2 cursor-pointer " key={d}>
                    <ProfilePic loading size={ProfileSize.small} userName={''} />
                    <p className="skeleton w-20 h-2"></p>
                </div>)}
        </div>
    )

    return (
        <div className="text-sm text-label opacity-65 h-56 overflow-y-scroll  mb-2" >
            {shallowYtData.map(d => d &&
                <div
                    onClick={() => navigate(`/y/${d.username}/home`)}
                    className="bg-secondaryLight p-2 flex justify-start items-center hover:bg-secondary gap-2 cursor-pointer " key={d.id}>
                    <ProfilePic size={ProfileSize.small} userName={d.username} imageSrc={d.profilepic as string} />
                    <p>{d.username}</p>
                </div>)}
        </div>
    )
}

