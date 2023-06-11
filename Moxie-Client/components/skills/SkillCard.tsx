import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "../interaction/Button"
import Link from "next/link"
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import useHoverDelay from "@/utils/hooks/useHoverDelay";
import dateUtils from "@/utils/dateUtils";
import { Skill } from "@/pages/skills";
import { resolveIcon } from "@/utils/IconConstants";


const SkillCard = ({ skill }: Props) => {
    const [hover, setHover] = useHoverDelay()


    return (<div className="flex flex-col  border border-gray-200 rounded-lg shadow-md transistion duration-300 md:hover:scale-105 md:flex-row md:w-full dark:border-gray-700 dark:bg-gray-800" onMouseEnter={() => setHover(true)}>
        <div className="h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg text-8xl flex items-center justify-around" >

            <FontAwesomeIcon icon={resolveIcon(skill.icon)} bounce={hover} style={{ color: "#ffffff", }} />
        </div>
        <div className="flex flex-col justify-between p-4 leading-normal w-3/4">
            <div className="flex flex-col md:flex-row items-start justify-between">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {skill.name}
                </h5>
                <p className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-gray-400">
                    {/* Last change: {dateUtils.formatDistance(skill.dateLastModified)} */}

                </p>
            </div>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Tags:
            </p>


            <div className="flex gap-6 md:flex-row justify-end">

                <Link href={`/skills/${skill.id}`}>
                    <Button type="button">
                        View more Info
                    </Button>
                </Link>


            </div>
        </div>
    </div>)
}

type Props = {
    skill: Skill
}
export default SkillCard