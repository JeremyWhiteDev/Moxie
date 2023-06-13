import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Skill, SkillWithTags } from ".";
import { useState } from "react";
import Link from "next/link";
import Container from "@/components/layout/Container";
import SkillCard from "@/components/skills/SkillCard";
import Button from "@/components/interaction/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { resolveIcon } from "@/utils/IconConstants";
import EditSkillModal from "@/components/skills/EditSkillModal";

export const getServerSideProps: GetServerSideProps<{
    initialSkill: SkillWithTags;
}> = async (context) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skillTree/withTags/${context.params?.id}`);
    //TODO: Wrap in Try/Catch with toaster
    const initialSkill = await res.json();
    return { props: { initialSkill } };
};


const SkillDetails = ({ initialSkill }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [skill, setSkills] = useState<SkillWithTags>(initialSkill)


    const [editSkillOpen, setEditSkillOpen] = useState<boolean>(false)


    const openEditModal = () => {
        setEditSkillOpen(true)
    }

    const closeEditModal = () => {
        setEditSkillOpen(false)
    }


    return <>
        <Container header="Skill Details">
            <Button type="button" onClick={openEditModal}>Edit</Button>
            <div className="mt-4 p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="stats" role="tabpanel" aria-labelledby="stats-tab">
                <dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-3 dark:text-white sm:p-8">
                    <div className="flex flex-col items-center justify-center">
                        <dd className="text-gray-500 dark:text-gray-400">Name</dd>
                        <dt className="mb-2 text-3xl font-extrabold">{skill.name}</dt>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <dd className="text-gray-500 dark:text-gray-400">Icon</dd>
                        <dt className="mb-2 text-3xl font-extrabold"><FontAwesomeIcon icon={resolveIcon(skill.icon)} /></dt>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <dd className="text-gray-500 dark:text-gray-400">Date Created</dd>
                        <dt className="mb-2 text-3xl font-extrabold">{new Date(skill.dateCreated).toDateString()}</dt>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <dd className="text-gray-500 dark:text-gray-400">Date Last Modified</dd>
                        <dt className="mb-2 text-3xl font-extrabold">{new Date(skill.dateCreated).toDateString()}</dt>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <dd className="text-gray-500 dark:text-gray-400">Proficiency Level</dd>
                        <dt className="mb-2 text-3xl font-extrabold">{skill.proficiencyLevel}</dt>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <dd className="text-gray-500 dark:text-gray-400">Tags</dd>
                        <dt className="mb-2 text-3xl font-extrabold">
                            {skill.tags?.length > 0
                                ? skill.tags.map(s => s.name).join(", ")
                                : "None"}</dt>
                    </div>
                </dl>
            </div>
            <EditSkillModal isOpen={editSkillOpen} close={closeEditModal} skill={skill} />
        </Container>
    </>
}

export default SkillDetails