import Home from "@/pages"
import { AppProps } from "next/app"
import { GetServerSideProps, NextComponentType } from "next"
import { getCookie } from "cookies-next"
import { User } from "./authUtils"
import { useAuth } from "./AuthProvider"
import Loading from "@/components/Loading"
import Main from "@/components/layout/Main"
import Header from "@/components/layout/Header"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Signin from "@/pages/signin"
import Register from "@/pages/register"

export const ViewDirectorBasedOnAuth = ({ Component, pageProps }: Props) => {
    const auth = useAuth()
    const router = useRouter()

    //this will always return components, but depending on the auth, it will push routes. So someone won't be able to access a page they don't have the priveleges for. 
    //but what if 

    //This whole bit needs to be revisited.

    useEffect(() => {
        if (auth.user?.id == undefined && (router.asPath !== "/signin" && router.asPath !== "/register")) {
            router.push("/signin")
        }
        //conflict here? need to check userLoading.
        if (auth.user?.id && (router.asPath === "/signin" || router.asPath === "/register")) {
            router.push("/")
        }

    }, [router])

    //something like this is close.
    //creating a list or object of all protected routes in app. 
    //This is going back to a similar issue I already had! this component doesn't get rerendered unless the consumer changes. That's the point of the route watcher but also we can't rely on that if someone manually types in the address.
    const resolveAuthorizedViews = () => {
        if (auth.user?.id == undefined) {
            if (Component === Signin as NextComponentType || Component === Register as NextComponentType) {
                return <Component />
            } else {
                return <Loading />
            }
        } else {
            if (Component !== Signin as NextComponentType && Component !== Register as NextComponentType) {
                return <Component {...pageProps} />
            }
            else { return <Loading /> }
        }

    }

    //this is why they had the "userLoading" property so that there wouldn't be this intial glitch of states. I'm dealing with a couple different scenarios here. User is signed in, but server doesn't know it.

    return (<>
        {auth.user?.id !== undefined ? <Header /> : ""}
        <Main>
            {resolveAuthorizedViews()}
        </Main>
    </>
    )
}

type Props = {
    Component: NextComponentType,
    pageProps: any,
}

//{auth.user?.id !== undefined && (Component === Signin as NextComponentType || Component === Register as NextComponentType) ? <Component /> : <Loading />}