import { User, UserLogin, authenticate } from "@/utils/authUtils"
import { EMAIL_SIGN_IN, GOOGLE_SIGN_IN } from "@/utils/constants"
import Link from "next/link"
import { useRouter } from "next/router"
import { ChangeEvent, FormEvent, useState, useEffect } from "react"
import Button from "../components/interaction/Button"
import FormField from "../components/interaction/FormField"
import Container from "@/components/layout/Container"

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
        const domId = evt.target.id.split("--")[1]
        const copy = { ...login };
        copy[domId as keyof UserLogin] = (evt.target as HTMLInputElement).value;
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
                <FormField id="login--email" label="Your Email" stateValue={login.email} type="text" onChangeHandler={updateLogin} placeholder="name@email.com" />
                <FormField id="login--password" label="Your Password" stateValue={login.password} type="password" onChangeHandler={updateLogin} />


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