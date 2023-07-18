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



const AddTagModal = ({ isOpen, close }: Props) => {
    const [formFields, setFormFields] = useState<Tag>({
        name: "",
        userId: "",
        id: null
    })

    const router = useRouter()


    const auth = useAuth();

    const updateState = (evt: ChangeEvent) => {
        const domId = evt.target.id.split("--")[1];
        const copy = { ...formFields };
        copy[domId as keyof Tag] = (evt.target as HTMLInputElement).value;
        setFormFields(copy);
    };

    const handleSubmit = async (evt: FormEvent<HTMLButtonElement>) => {
        evt.preventDefault();
        const sendToApi = { ...formFields };
        sendToApi.userId = auth.user?.id as string;

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tag`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sendToApi)
        })
        if (response.ok) {
            close();
            router.push(`/user-settings/${auth?.user?.id}`)
        }


    }


    return <Modal title="Add Tag" isOpen={isOpen} close={close}>

        <div className="mt-2 flex flex-col items-center justify-center">

            <form className="w-full">
                <FormField id="addSkill--name" label="Tag Name" stateValue={formFields.name} type="text" onChangeHandler={updateState} />
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


export type Tag = {
    id: string | null,
    name: string,
    userId: string
}

type Props = {
    isOpen: boolean,
    close: () => void
}

export default AddTagModal