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

    if (auth.user?.id == null) {
                return (
                    <Main>
                        <Signin />
                    </Main>
                )
            } 
            if (auth.user?.id) {
                return (<>
                    <Header />
                    <Main>
                        <Component {...pageProps} />
                    </Main>
                </>
                )
            }





}

type Props = {
    Component: NextComponentType,
    pageProps: any,
}
// /    //TODO: resolve router with protected routes. auth context causes all child components to rerender. but this ViewDirector only gets rendered and returns once. 
// useEffect(() => {
//     const handleRouteChange = () => {
//         setViews(resolveViews)
//     };

//     router.events.on('routeChangeStart', handleRouteChange);

//     // If the component is unmounted, unsubscribe
//     // from the event with the `off` method:
//     return () => {
//         router.events.off('routeChangeStart', handleRouteChange);
//     };
// }, [router]);



// const resolveViews = () => {

//     if (router.pathname == "/signin" && auth.user?.id == null) {
//         return (
//             <Main>
//                 <Signin />
//             </Main>
//         )
//     } else if (router.pathname == "/register" && auth.user?.id == null) {
//         return (
//             <Main>
//                 <Register />
//             </Main>
//         )
//     }
//     if (auth.user?.id && router.pathname !== "/signin") {
//         return (<>
//             <Header />
//             <Main>
//                 <Component {...pageProps} />
//             </Main>
//         </>
//         )
//     }
//     //TODO: userLoading isn't going to correct null state when logging out
//     if (auth.userLoading == null) {

//     }
//     return (
//         <Main>
//             <Signin />
//         </Main>
//     )
// }