import { useSelector } from "react-redux";
import { linkType, ScreenWrapper } from "../../components/ScreenWrapper";
import { ScreeAreaTxt } from "../../components/screenAreaTxt";
import { CollaBoratorCard } from "../../components/cards/collaboratorCard";
import { CommandSearch } from "../../components/searchBar/searchbar";
import { useCallback, useEffect, useRef, useState } from "react";
import { userInterface } from "../../types/youtuberTypes";
import { fetchCollaborators, fetchCollaboratorsShallow } from "../../fetch/fetchForCollaborators";
import { CardWrapper } from "../../components/cards/cardWrapper";

export const CollaboratorsScreen: React.FC = () => {

    return (
        <ScreenWrapper
            links={linkType.one}
            preRouter={"/y/"}
        >
            <div className="flex h-full relative justify-center bg-black items-center ">
                <ScreeAreaTxt border title="Collaborators" width={"100%"} paddingBottom="12px" borderRadius="0px" />
                <CollaboratorArea />
            </div>
        </ScreenWrapper>
    )
}

const LIMIT = 4;


const CollaboratorArea = () => {

    const [start, setStart] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [youtuberData, setYoutuberData] = useState<userInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const observer = useRef<IntersectionObserver | null>(null);
    const bottomDivRef = useRef<HTMLDivElement | null>(null);

    const onLaptopScreen = useSelector((state: any) => state.sidebar).onLaptopScreen;

    const fetchMoreYoutubers = useCallback(async () => {

        if (!hasMore || loading) return;
        setLoading(true);
        console.log('second')

        const response = await fetchCollaborators(searchQuery, LIMIT, start);
        if (response) {
            setYoutuberData((prev) => [...prev, ...response.data.ytData]);
            setStart((prev) => prev + LIMIT);
            setHasMore(response.data.count > start + LIMIT);
        }
        setLoading(false);
    }, [searchQuery, start, hasMore, loading]);

    useEffect(() => {
        setYoutuberData([]);
        setStart(0);
        setHasMore(true);
        setLoading(false)
        fetchMoreYoutubers();
    }, [searchQuery])

    useEffect(() => {

        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    fetchMoreYoutubers();
                }
            },
            { threshold: 1.0 }
        );

        if (bottomDivRef.current) observer.current.observe(bottomDivRef.current);

        return () => observer.current?.disconnect();
    }, [loading, hasMore, fetchMoreYoutubers]);

    return (
        <div className={`w-[90%] text-xs sm:text-sm justify-start pt-24 items-center h-full relative flex flex-col ${!onLaptopScreen ? "sm:w-[90%]" : "sm:w-[80%]"}`}>

            <CommandSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} fnc={fetchCollaboratorsShallow} placeholder="Search Collaborators..." />

            <div className="h-[90%] w-full border border-secondaryLight overflow-y-scroll scroll-smooth scrollbar-thin scrollbar-track-transparent scrollbar-thumb-accent rounded-xl grid sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 lg:place-content-start place-items-center gap-10 p-5">
                {youtuberData.map((yo) => (
                    <CollaBoratorCard
                        {...yo}
                        key={yo.id}
                        extraTStyle="cursor-pointer hover:opacity-100 opacity-90 bg-secondary border-secondaryLight duration-75 ease-linear"
                    />
                ))}

                {loading && (
                    <CardWrapper
                        extraTStyle="cursor-pointer skeleton hover:opacity-100 opacity-90 bg-secondary border-secondaryLight duration-75 ease-linear"
                    >
                        <p className="hidden">Loading...</p>
                    </CardWrapper>
                )}

                <div ref={bottomDivRef} className="h-0 w-full" />
            </div>
        </div>
    );
}





