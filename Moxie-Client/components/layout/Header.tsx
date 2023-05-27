import UserHeaderMenu from "../interaction/UserHeaderMenu"

const Header = () => {
    return <header className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 backdrop-blur-xl border-b dark:border-gray-600 dark:bg-slate-950/20 p-8 fixed top-0 w-screen">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="https://flowbite.com" className="flex items-center">
                <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Moxie</span>
            </a>
            <div className="flex items-center lg:order-2">
                <UserHeaderMenu />

            </div>
        </div>
    </header>
}

export default Header