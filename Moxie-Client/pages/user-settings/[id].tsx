import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { Tag } from "@/components/skills/AddSkillModal";
import { getCookie } from "cookies-next";
import { User } from "@/utils/authUtils";
import Button from "@/components/interaction/Button";
import AddTagModal from "@/components/tags/AddTagModal";

export const getServerSideProps: GetServerSideProps<{
    initialTags: Tag[];
}> = async (context) => {
    let initialTags = []
    if (getCookie("moxieUser", context)) {
        const userCookie = getCookie("moxieUser", context) as string
        const currentUser = JSON.parse(userCookie) as User
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tag/user/${currentUser.id}`);
        initialTags = await response.json();
    }
    //TODO: Wrap in Try/Catch with toaster
    return { props: { initialTags } };
};


const UserSettings = ({ initialTags }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    //add button
    const [addTagOpen, setAddTagOpen] = useState<boolean>(false)

    const openModal = () => {
        setAddTagOpen(true)
    }

    const closeModal = () => {
        setAddTagOpen(false)
    }

    return <>
        <Container header="User Settings">
            <div className="mb-12">
                <div className="border-b border-gray-500 flex justify-between">

                    <h1 className="dark:text-white text-left  md:text-left w-16 text-2xl pb-4 mt-5 ">
                        Tags
                    </h1>
                    <Button type="button" onClick={openModal}>
                        +
                    </Button>
                </div>
            </div>
            {initialTags?.map((t: Tag) => <h1 key={t.id}>{t.name}</h1>)}
        </Container>
        <AddTagModal isOpen={addTagOpen} open={openModal} close={closeModal} />
    </>
}



export default UserSettings