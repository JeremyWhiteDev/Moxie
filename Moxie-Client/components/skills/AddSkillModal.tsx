import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import Button from "../interaction/Button"
import FormField from "../interaction/FormField"
import { useAuth } from "@/utils/AuthProvider"
import { Skill } from "@/pages/skills"
import MultiSelect from "../interaction/MultiSelect"
import Modal from "../interaction/Modal"
import PopoverMenu from "../interaction/Popover"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDumbbell } from "@fortawesome/free-solid-svg-icons"
import { resolveIcon } from "@/utils/IconConstants"
import { useRouter } from "next/router"



const AddSkillModal = ({ isOpen, close }: Props) => {
    const [formFields, setFormFields] = useState<SkillForm>({
        name: "",
        icon: "faRocket",
        proficiencyLevel: ""
    })

    const [tags, setTags] = useState<Tag[]>([])
    const [selectedItems, setSelectedItems] = useState<any[]>([])
    const router = useRouter()


    const auth = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tag/user/${auth?.user?.id}`);
            const tagsData = await data.json();
            setTags(tagsData)
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
        sendToApi.tagIds = selectedItems.map(item => item.id);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/SkillTree`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sendToApi)
        })
        if (response.ok) {
            close();
            setFormFields({
                name: "",
                icon: "faRocket",
                proficiencyLevel: ""
            })
            setSelectedItems([])
            router.push("/skills")
        }


    }

    const updateIcon = (icon: string): void => {
        const copy = { ...formFields }
        copy.icon = icon
        setFormFields(copy)
    }


    return <Modal title="Add Skill" isOpen={isOpen} close={close}>

        <div className="mt-2 flex flex-col items-center justify-center">
            <div className="dark:border-violet-800 border-4 relative flex justify-center items-center text-8xl text-center p-4 rounded-full w-44 h-44 align-middle">
                <FontAwesomeIcon icon={resolveIcon(formFields.icon)} style={{ color: "#ffffff", }} />
                <PopoverMenu updateIcon={updateIcon} position="absolute -bottom-2 -right-12" />
            </div>
            <form className="w-full">
                <FormField id="addSkill--name" label="Skill Name" stateValue={formFields.name} type="text" onChangeHandler={updateState} />
                <FormField id="addSkill--proficiencyLevel" label="Skill Proficiency" stateValue={formFields.proficiencyLevel} type="text" onChangeHandler={updateState} />
                <MultiSelect items={tags} label="Tags" selectedItems={selectedItems} setSelectedItems={setSelectedItems} />

                <div className="mt-4 md:space-x-4">
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

export type Tag = {
    id: string,
    name: string,
    userId: string
}

type Props = {
    isOpen: boolean,
    close: () => void
}

export default AddSkillModal