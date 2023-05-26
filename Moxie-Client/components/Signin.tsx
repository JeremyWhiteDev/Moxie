import { User, UserLogin, authenticate } from "@/utils/authUtils"
import { EMAIL_SIGN_IN, GOOGLE_SIGN_IN } from "@/utils/constants"
import { getCookie } from "cookies-next"
import { GetServerSideProps } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { ChangeEvent, FormEvent, useState, useEffect } from "react"

const Signin = () => {
    const [login, setLogin] = useState<UserLogin>({
        email: "",
        password: "",
        uid: "",
        accessToken: "",
        loginType: ""
    })
    const router = useRouter();

    const updateLogin = (evt: ChangeEvent) => {
        const copy = { ...login };
        copy[evt.target.id as keyof UserLogin] = (evt.target as HTMLInputElement).value;
        setLogin(copy);
    };

    // Login With Email & Password
    const handleAuthenticate = async (e: FormEvent<HTMLButtonElement>, signInMethod: string) => {
        e.preventDefault();
        authenticate(login, router, signInMethod)
    };


    return <main className="">
        <section className="md:max-w-3xl mx-auto">
            <h1 className="dark:text-white mb-4">Login</h1>
            <form>
                <div className="mb-6">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your email
                    </label>
                    <input
                        value={login.email}
                        id="email"
                        onChange={(evt) => updateLogin(evt)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@gizmo.com"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your password
                    </label>
                    <input
                        type="password"
                        value={login.password}
                        id="password"
                        onChange={(evt) => updateLogin(evt)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    onClick={(evt) => handleAuthenticate(evt, EMAIL_SIGN_IN)}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit
                </button>
            </form>
            <section className=" mt-8 dark:text-white">
                New User?{" "}
                <Link href="/register">
                    <span className="text-blue-600 underline">Register Here</span>
                </Link>
            </section>
            <h2 className="mt-4 dark:text-white">Or</h2>
            <button
                type="submit"
                onClick={(evt) => handleAuthenticate(evt, GOOGLE_SIGN_IN)}
                className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Login with Google
            </button>
        </section>
    </main>
}

export default Signin