const Main = ({ children }: any) => {
    return (
        <main className="pt-20 min-h-screen bg-gradient-to-br from-10% via-20% to-70% bg-neutral-50 dark:from-purple-950 dark:via-violet-950 dark:to-slate-950 pb-16">
            {children}
        </main>
    )
}

export default Main