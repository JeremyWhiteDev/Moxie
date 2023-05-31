import { Dispatch, SetStateAction, useEffect, useState } from "react";

const useHoverDelay = (): [boolean, Dispatch<SetStateAction<boolean>>] => {
    const [hover, setHover] = useState(false)


    useEffect(() => {
        const sleep = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));
        async function delayHoverChange() {
            await sleep(800);
            setHover(false)
        }
        if (hover == true) {
            delayHoverChange();
        }

    }, [hover])

    return [hover, setHover]
}
export default useHoverDelay