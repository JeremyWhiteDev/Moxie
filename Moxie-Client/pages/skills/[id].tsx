import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Skill } from ".";
import { useState } from "react";
import Link from "next/link";
import Container from "@/components/layout/Container";
import SkillCard from "@/components/skills/SkillCard";
import Button from "@/components/interaction/Button";

export const getServerSideProps: GetServerSideProps<{
    initialSkill: Skill;
}> = async (context) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skillTree/${context.params?.id}`);
    //TODO: Wrap in Try/Catch with toaster
    const initialSkill = await res.json();
    return { props: { initialSkill } };
};


const SkillDetails = ({ initialSkill }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [skill, setSkills] = useState<Skill>(initialSkill)


    return <>
        <Container header="Skill Details">
            <SkillCard skill={skill} key={skill.id} />
        </Container>
    </>
}

export default SkillDetails