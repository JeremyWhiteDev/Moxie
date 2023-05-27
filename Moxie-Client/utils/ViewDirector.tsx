import Home from "@/pages"
import Signin from "@/components/Signin"
import { AppProps } from "next/app"
import { GetServerSideProps, NextComponentType } from "next"
import { getCookie } from "cookies-next"
import { User } from "./authUtils"
import { useAuth } from "./AuthProvider"
import Loading from "@/components/Loading"
import Main from "@/components/layout/Main"
import Header from "@/components/layout/Header"



export const ViewDirectorBasedOnAuth = ({ Component, pageProps }: Props) => {
    const auth = useAuth()

    if (auth.user?.id) {
        return (<>
            <Header />
            <Main>
                <Component {...pageProps} />
            </Main>
        </>
        )
    }
    if (auth.userLoading == null) {
        return (
            <Main>
                <Signin />
            </Main>
        )
    }
    return (
        <Main>
            <Signin />
        </Main>
    )
}

type Props = {
    Component: NextComponentType,
    pageProps: any,
}