import { AppUser, UserLogin, authenticate } from "@/utils/authUtils"
import { EMAIL_REGISTER, EMAIL_SIGN_IN, GOOGLE_SIGN_IN } from "@/utils/constants"
import Link from "next/link"
import { useRouter } from "next/router"
import { ChangeEvent, FormEvent, useState, useEffect } from "react"

import Button from "@/components/interaction/Button"
import FormField from "@/components/interaction/FormField"
import Container from "@/components/layout/Container"

const Register = () => {
    const [formFields, setFormFields] = useState<UserRegister>({
        email: "",
        password: "",
        passwordConf: "",
        firstName: "",
        lastName: "",
        uid: "",
        imageUrl: ""
    })
    const router = useRouter();

    const updateState = (evt: ChangeEvent) => {
        const domId = evt.target.id.split("--")[1]
        const copy = { ...formFields };
        copy[domId as keyof UserRegister] = (evt.target as HTMLInputElement).value;
        setFormFields(copy);
    };

    // Login With Email & Password
    const handleAuthenticate = async (e: FormEvent<HTMLButtonElement>, signInMethod: string) => {
        e.preventDefault();
        authenticate(formFields, router, signInMethod)
    };


    return (
        <Container header={"Register"}>
            <form>
                <FormField id="register--firstName" label="Your First" stateValue={formFields.firstName} type="type" onChangeHandler={updateState} />
                <FormField id="register--lastName" label="Your Last Name" stateValue={formFields.lastName} type="text" onChangeHandler={updateState} />
                <FormField id="register--email" label="Your Email" stateValue={formFields.email} type="text" onChangeHandler={updateState} />
                <FormField id="register--password" label="Your Passward" stateValue={formFields.password} type="password" onChangeHandler={updateState} />
                <FormField id="register--passwordConf" label="Pasword Confirmation" stateValue={formFields.passwordConf} type="password" onChangeHandler={updateState} />
                <Button type="submit" onClick={handleAuthenticate} onClickArgs={[EMAIL_REGISTER]}>
                    Submit
                </Button>
            </form>
        </Container>
    )

}

export type UserRegister = {
    email: string,
    uid: string,
    imageUrl: string,
    password: string,
    passwordConf: string,
    firstName: string,
    lastName: string
}

export default Register