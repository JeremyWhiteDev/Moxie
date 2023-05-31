import SkillCard from "@/components/cards/SkillCard"
import Container from "@/components/layout/Container"
import { routeConstants } from "@/utils/config";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Link from "next/link"

export const getServerSideProps: GetServerSideProps<{
    skills: Skill[];
}> = async () => {
    const res = await fetch(`${routeConstants.apiUrl}/skillTree`);
    const skills = await res.json();
    return { props: { skills } };
};

const Skills = ({ skills }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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