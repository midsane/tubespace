import SplitText from "./textAnimations/SplitText/SplitText"


export const ScreeAreaTxt: React.FC<{
  title: string,
  border?: boolean,
  width?: string,
  paddingBottom?: string,
  borderRadius?: string
}> = ({
  title,
  border = false,
  width = "100%",
  borderRadius = "8px",
  paddingBottom = "0" }) => {
    return <div
      style={{ width, paddingBottom, borderRadius }}
      className={`${border && "border-b"} items-center border-secondaryLight h-20 bg-primary absolute top-0 left-0 px-4 pt-5 z-[60] flex justify-between `}>
      <div className="text-accent" >
        <p >{">"}</p>
        <SplitText
          text={title}
          className="text-2xl text-white font-semibold text-center"

          animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
          animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
          threshold={0.2}
          rootMargin="-50px"
        />
      </div>

    </div>
  }
