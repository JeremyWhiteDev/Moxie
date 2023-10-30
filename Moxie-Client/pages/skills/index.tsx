import SkillCard from "@/components/skills/SkillCard"
import Button from "@/components/interaction/Button";
import Container from "@/components/layout/Container"
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import AddSkillModal from "@/components/skills/AddSkillModal";
import { getCookie } from "cookies-next";
import { AppUser } from "@/utils/authUtils";


export const getServerSideProps: GetServerSideProps<{
    initialSkills: SkillWithTags[];
}> = async (context) => {
    let initialSkills = []
    if (getCookie("moxieUser", context)) {
        const userCookie = getCookie("moxieUser", context) as string
        const currentUser = JSON.parse(userCookie) as AppUser

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skillTree/withTags/user/${currentUser.id}`);
        initialSkills = await res.json();
    }
    //TODO: Wrap in Try/Catch with toaster
    return { props: { initialSkills } };
};


const Skills = ({ initialSkills }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
            <section className="space-y-4">
                {initialSkills?.map(skill => <SkillCard skill={skill} key={skill.id} />)}
            </section>
        </Container>
        <AddSkillModal isOpen={addSkillOpen} close={closeModal} />
    </>
}

export type Skill = {
    id: string,
    name: string,
    icon: string,
    userId: string,
    proficiencyLevel: string,
    experiencePoints: number,
    availableSkillPoints: number,
    dateCreated: Date,
    dateLastModified: Date
}

export type SkillWithTags = {
    id: string,
    name: string,
    icon: string,
    userId: string,
    proficiencyLevel: string,
    experiencePoints: number,
    availableSkillPoints: number,
    dateCreated: Date,
    dateLastModified: Date,
    tags: IdNamePair[]
}

export type IdNamePair = {
    id: string,
    name: string
}

export default Skills