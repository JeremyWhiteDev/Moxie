import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import Button from "../interaction/Button"
import FormField from "../interaction/FormField"
import Modal from "../layout/Modal"
import { useAuth } from "@/utils/AuthProvider"
import { Skill } from "@/pages/skills"
import MultiSelect from "../interaction/MultiSelect"



const AddSkillModal = ({ isOpen, open, close }: Props) => {
    const [formFields, setFormFields] = useState<SkillForm>({
        name: "",
        icon: "",
        proficiencyLevel: ""
    })

    const [tags, setTags] = useState<Tag[]>([])

    const auth = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tag`);
            const tagsData = await data.json();
            const tagsWithState = tagsData.map((tag: Tag) => {
                const newTag = { ...tag }
                newTag.isChecked = false
                return newTag
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
        sendToApi.userId = auth.user?.id as string;
        sendToApi.tagIds = tags.filter((tag: Tag) => tag.isChecked).map((tag: Tag) => tag.id)
        sendToApi.proficiencyLevel = "beginner"

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Skill`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sendToApi)
        })


    }


    return <Modal title="Add Skill" isOpen={isOpen} open={open} close={close}>
        <div className="mt-2">
            <form>
                <FormField id="addSkill--name" label="Skill Name" stateValue={formFields.name} type="text" onChangeHandler={updateState} />
                <FormField id="addSkill--icon" label="Your Last Name" stateValue={formFields.icon} type="text" onChangeHandler={updateState} />
                <MultiSelect items={tags} label="Tags" />

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
    proficiencyLevel: string
}

type AddSkillRequest = {
    name: string,
    icon: string,
    userId: string,
    proficiencyLevel: string,
    tagIds: string[]
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