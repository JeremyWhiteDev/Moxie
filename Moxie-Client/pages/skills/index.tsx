import SkillCard from "@/components/skills/SkillCard"
import Button from "@/components/interaction/Button";
import Container from "@/components/layout/Container"
import { routeConstants } from "@/utils/config";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link"
import { useEffect, useState } from "react";
import AddSkillModal from "@/components/skills/AddSkillModal";


export const getServerSideProps: GetServerSideProps<{
    initialSkills: Skill[];
}> = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skillTree`);
    //TODO: Wrap in Try/Catch with toaster
    const initialSkills = await res.json();
    return { props: { initialSkills } };
};


const Skills = ({ initialSkills }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [skills, setSkills] = useState<Skill[]>(initialSkills)

    const [addSkillOpen, setAddSkillOpen] = useState<boolean>(false)

    const openModal = () => {
        setAddSkillOpen(true)
    }

    const closeModal = () => {
        setAddSkillOpen(false)
    }

    return <>
        <Container header="Skills">
            <div className="mb-12">
                <Button type="button" onClick={openModal}>
                    Add Skill
                </Button>
            </div>
            {skills?.map(skill => <SkillCard skill={skill} key={skill.id} />)}
        </Container>
        <AddSkillModal isOpen={addSkillOpen} open={openModal} close={closeModal} />
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