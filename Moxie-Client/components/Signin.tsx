import { User, UserLogin, authenticate } from "@/utils/authUtils"
import { EMAIL_SIGN_IN, GOOGLE_SIGN_IN } from "@/utils/constants"
import Link from "next/link"
import { useRouter } from "next/router"
import { ChangeEvent, FormEvent, useState, useEffect } from "react"
import Container from "./layout/Container"
import Button from "./interaction/Button"

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


    return (
        <Container header={"Login"}>
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
                <Button type="submit" onClick={handleAuthenticate} onClickArgs={[EMAIL_SIGN_IN]}>
                    Submit
                </Button>
            </form>
            <section className=" mt-8 dark:text-white">
                New User?{" "}
                <Link href="/register">
                    <span className="text-blue-600 underline">Register Here</span>
                </Link>
            </section>
            <h2 className="mt-4 dark:text-white">Or</h2>
            <Button type="submit" onClick={handleAuthenticate} onClickArgs={[GOOGLE_SIGN_IN]}>
                Sign In with Google
            </Button>
        </Container>
    )

}

export default Signin