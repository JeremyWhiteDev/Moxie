

const Button = ({ children, type, onClick, onClickArgs, className }: Props) => {


    if (onClick && onClickArgs?.length) {

        return (
            <button
                type={type}
                onClick={(evt) => onClick(evt, ...onClickArgs)}
                className={`${className} mt-4 text-white max-h-10 bg-violet-800 hover:bg-violet-900 focus:ring-4 md:w-fit focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-violet-800 dark:hover:bg-violet-900 dark:focus:ring-blue-800`}
            >
                {children}
            </button>
        )
    }

    if (onClick) {

        return (
            <button
                type={type}
                onClick={(e) => onClick(e)}
                className={`${className} mt-4 text-white max-h-10 bg-violet-800 hover:bg-violet-900 focus:ring-4 md:w-fit focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-violet-800 dark:hover:bg-violet-900 dark:focus:ring-blue-800`}
            >
                {children}
            </button>
        )
    }
    return <button
        type={type}
        className={`${className} mt-4 text-white max-h-10 bg-violet-800 hover:bg-violet-900 focus:ring-4 md:w-fit focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-violet-800 dark:hover:bg-violet-900 dark:focus:ring-blue-800`}
    >
        {children}
    </button>
}


type Props = {
    children: any,
    type: "button" | "submit" | "reset" | undefined
    onClick?: Function,
    onClickArgs?: any[],
    className?: string
}
export default Button