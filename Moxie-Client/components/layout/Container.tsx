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
        <div className={`md:max-w-xl mx-auto backdrop-blur-xl bg-slate-950/20 p-8 rounded-lg flex-col flex`}>
            <h1 className="dark:text-white text-center md:text-left text-4xl mt-5 md:max-w-5xl mx-auto mb-20">
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

// ${resolveSize(size)}