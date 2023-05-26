import Home from "@/pages"
import Signin from "@/components/Signin"
import { AppProps } from "next/app"
import { GetServerSideProps, NextComponentType } from "next"
import { getCookie } from "cookies-next"
import { User } from "./authUtils"
import { useAuth } from "./AuthProvider"
import Loading from "@/components/Loading"



export const ViewDirectorBasedOnAuth = ({ Component, pageProps }: Props) => {
    const auth = useAuth()

    if (auth.user?.id) {
        return <Component {...pageProps} />
    }
    if (auth.userLoading == null) {
        return <Signin />
    }
    return <Loading />
}

type Props = {
    Component: NextComponentType,
    pageProps: any,
}