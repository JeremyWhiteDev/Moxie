import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import Container from "@/components/layout/Container";
import { Tag } from "@/components/skills/AddSkillModal";
import { getCookie } from "cookies-next";
import { User } from "@/utils/authUtils";
import Button from "@/components/interaction/Button";
import AddTagModal from "@/components/tags/AddTagModal";
import TagButton from "@/components/tags/TagButton";
import EditTagModal from "@/components/tags/EditTagModal";

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
    const [editTagOpen, setEditTagOpen] = useState<boolean>(false)
    const [editTag, setEditTag] = useState<Tag>()

    const openAddTagModal = () => {
        setAddTagOpen(true)
    }

    const closeAddTagModal = () => {
        setAddTagOpen(false)
    }
    const openEditTagModal = (tag: Tag) => {
        setEditTag(tag)
        setEditTagOpen(true)
    }

    const closeEditTagModal = () => {
        setEditTagOpen(false)
    }

    return <>
        <Container header="Settings">
            <div className="border-b border-gray-500 flex justify-between mb-12">

                <h1 className="dark:text-white text-left  md:text-left max-w-32 text-2xl pb-4 mt-5 ">
                    User Profile
                </h1>
            </div>
            <div className="border-b border-gray-500 flex justify-between mb-12">
                <h1 className="dark:text-white text-left  md:text-left max-w-32 text-2xl pb-4 mt-5 ">
                    Tags
                </h1>
                <Button type="button" onClick={openAddTagModal}>
                    +
                </Button>
            </div>
            <div className="space-y-2">
                {initialTags?.map((tag: Tag) => <TagButton tag={tag} openModal={() => openEditTagModal(tag)} />)}
            </div>

        </Container>
        <AddTagModal isOpen={addTagOpen} close={closeAddTagModal} />
        {editTag && <EditTagModal isOpen={editTagOpen} close={closeEditTagModal} tag={editTag} />}
    </>
}



export default UserSettings