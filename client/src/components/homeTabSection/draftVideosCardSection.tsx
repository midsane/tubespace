import { DraftVideosCard } from "../cards/draftVideosCard"

export const DraftVideosCardSection: React.FC = () => {
    return (
        <div className="w-[85%] rounded-3xl flex justify-start gap-10 py-10 px-9  h-min-10 bg-black border border-white/10 h-[80%] items-center " >

            <DraftVideosCard
                title="sample video 1"
                extraTStyle="w-[30%] h-[80%] bg-zinc-900 border-white/10"
            />

        </div>
    )
}