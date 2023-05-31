

const Button = ({ children, type, onClick, onClickArgs }: Props) => {


    if (onClick && onClickArgs?.length) {

        return (
            <button
                type={type}
                onClick={(evt) => onClick(evt, ...onClickArgs)}
                className="mt-4 text-white bg-violet-800 hover:bg-violet-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-violet-800 dark:hover:bg-violet-900 dark:focus:ring-blue-800"
            >
                {children}
            </button>
        )
    }
    return <button
        type={type}
        className="mt-4 text-white bg-violet-800 hover:bg-violet-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-violet-800 dark:hover:bg-violet-900 dark:focus:ring-blue-800"
    >
        {children}
    </button>
}


type Props = {
    children: any,
    type: "button" | "submit" | "reset" | undefined
    onClick?: Function,
    onClickArgs?: any[]
}
export default Button