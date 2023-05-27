import Home from "@/pages"
import Signin from "@/pages/Signin"
import { AppProps } from "next/app"
import { GetServerSideProps, NextComponentType } from "next"
import { getCookie } from "cookies-next"
import { User } from "./authUtils"
import { useAuth } from "./AuthProvider"
import Loading from "@/components/Loading"
import Main from "@/components/layout/Main"
import Header from "@/components/layout/Header"
import { useRouter } from "next/router"
import Register from "@/pages/Register"
import { useEffect, useState } from "react"



export const ViewDirectorBasedOnAuth = ({ Component, pageProps }: Props) => {
    const auth = useAuth()
    const router = useRouter()
    const [views, setViews] = useState<JSX.Element>()


    //TODO: resolve router with protected routes. auth context causes all child components to rerender. but this ViewDirector only gets rendered and returns once. 
    useEffect(() => {
        setViews(resolveViews())
    }, [router.asPath])


    const resolveViews = () => {

        if (router.pathname == "/signin" && auth.user?.id == null) {
            return (
                <Main>
                    <Signin />
                </Main>
            )
        } else if (router.pathname == "/register" && auth.user?.id == null) {
            return (
                <Main>
                    <Register />
                </Main>
            )
        }
        if (auth.user?.id && router.pathname !== "signin") {
            return (<>
                <Header />
                <Main>
                    <Component {...pageProps} />
                </Main>
            </>
            )
        }
        //TODO: userLoading isn't going to correct null state when logging out
        if (auth.userLoading == null) {

        }
        return (
            <Main>
                <Signin />
            </Main>
        )
    }
    return views
}

type Props = {
    Component: NextComponentType,
    pageProps: any,
}