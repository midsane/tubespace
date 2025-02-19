import favicon from "/favicon.png"
export const WebsiteLogo: React.FC<{ noText?: boolean }> = ({ noText = false }) => {
    return <span className="flex gap-2 cursor-pointer  flex-col sm:flex-row">
        <img width={35} className="" src={favicon} />
        {!noText && <p className="text-gray-200">TubeSpace</p>}
    </span>
}