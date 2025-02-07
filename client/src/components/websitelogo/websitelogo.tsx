import favicon from "/favicon.png"
export const WebsiteLogo: React.FC = () => {
    return <span className="flex gap-2 pl-10 pt-20 cursor-pointer  flex-col sm:flex-row">
        <img width={35} className="" src={favicon} />
        <p className="">tubespace</p>
    </span>
}