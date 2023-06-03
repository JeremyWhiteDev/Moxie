import SkillCard from "@/components/cards/SkillCard"
import Container from "@/components/layout/Container"
import { getSkills } from "@/server/dataAccess";
import { routeConstants, serverRoute } from "@/utils/config";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Link from "next/link"
import { useEffect, useState } from "react";



const Skills = () => {

    const [skills, setSkills] = useState<Skill[]>([])
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${routeConstants.apiUrl}/skilltree`);
            const skills = await res.json();
            setSkills(skills)
        }
        fetchData()
    }, [])

    return <>


        <Link href="/">
            <Container header="Skills">

                {skills?.map(skill => <SkillCard skill={skill} key={skill.id} />)}
            </Container>


        </Link>

    </>
}

export type Skill = {
    id: string,
    userId: string,
    proficiencyLevel: string,
    experiencePoints: number,
    availableSkillPoints: number,
    dateCreated: string,
    dateLastModified: string
}

export default Skills

