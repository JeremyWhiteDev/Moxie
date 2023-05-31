const Container = ({ children, header, size }: Props) => {
    const resolveSize = (size: Size): string => {
        if (size === "sm") {
            return "max-w-xl"
        } else if (size === "md") {
            return "max-w-3xl"
        } else if (size === "lg") {
            return "max-w-6xl"
        } else {
            return "max-w-6xl"
        }
    }
    return (
        <div className={`md:max-w-6xl -mt-4 mx-auto  bg-slate-900/60 p-8 rounded-lg flex-col shadow-inner shadow-slate-900 flex`}>
            <h1 className="dark:text-white text-left md:text-left text-4xl mt-5 md:max-w-5xl  mb-20">
                {header}
            </h1>
            {children}
        </div>
    )
}

type Props = {
    children: any,
    header: string,
    size?: Size
}

type Size = "sm" | "md" | "lg" | undefined

export default Container