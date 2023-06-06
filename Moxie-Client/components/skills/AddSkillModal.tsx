import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import Button from "../interaction/Button"
import FormField from "../interaction/FormField"
import Modal from "../layout/Modal"
import { useAuth } from "@/utils/AuthProvider"
import { Skill } from "@/pages/skills"



const AddSkillModal = ({ isOpen, open, close }: Props) => {
    const [formFields, setFormFields] = useState<SkillForm>({
        name: "",
        icon: "",
    })

    const [tags, setTags] = useState<Tag[]>([])

    const auth = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tag`);
            const tags = await data.json();
            const tagsWithState = tags.map((tag: Tag) => {
                tag.isChecked = false
            });
            setTags(tagsWithState)
        }
        fetchData()
    }, [])

    const updateState = (evt: ChangeEvent) => {
        const domId = evt.target.id.split("--")[1];
        const copy = { ...formFields };
        copy[domId as keyof SkillForm] = (evt.target as HTMLInputElement).value;
        setFormFields(copy);
    };

    const handleSubmit = async (evt: FormEvent<HTMLButtonElement>) => {
        evt.preventDefault();
        const sendToApi = { ...formFields } as AddSkillRequest;
        sendToApi.dateCreated = new Date();
        sendToApi.dateLastModified = new Date();
        sendToApi.userId = auth.user?.id as string;

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Skill`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sendToApi)
        })

        if (response.ok) {
            const addedSkill = await response.json() as Skill
            const postSkillTags = {
                skillId: addedSkill.id,
                tagIds: tags.filter((tag: Tag) => tag.isChecked).map((tag: Tag) => tag.isChecked)
            }

            const tagResp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Skill/addTags`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(postSkillTags)
            })
        }
    }


    return <Modal title="Add Skill" isOpen={isOpen} open={open} close={close}>
        <div className="mt-2">
            <form>
                <FormField id="addSkill--name" label="Skill Name" stateValue={formFields.name} type="text" onChangeHandler={updateState} />
                <FormField id="addSkill--icon" label="Your Last Name" stateValue={formFields.icon} type="text" onChangeHandler={updateState} />

                <div className="mt-4 space-x-4">
                    <Button type="submit" onClick={handleSubmit}>
                        Submit
                    </Button>
                    <Button type="button" onClick={close}>
                        Cancel
                    </Button>
                </div>
            </form>
        </div>

    </Modal>
}

type SkillForm = {
    name: string,
    icon: string,
}

type AddSkillRequest = {
    name: string,
    icon: string,
    userId: string,
    dateCreated: Date,
    dateLastModified: Date
}

type Tag = {
    id: string,
    name: string,
    isChecked?: boolean
}

type Props = {
    isOpen: boolean,
    open: () => void,
    close: () => void
}

export default AddSkillModal