import { HTMLInputTypeAttribute } from "react"

const FormField = ({ id, label, stateValue, type, placeholder, onChangeHandler }: Props) => {
    return <fieldset className="mb-6">
        <label
            htmlFor={id}
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
            {label}
        </label>
        <input
            value={stateValue}
            type={type}
            id={id}
            onChange={(evt) => onChangeHandler(evt)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={placeholder}
            required
        />
    </fieldset>
}

type Props = {
    id: string,
    label: string,
    stateValue: any,
    type: HTMLInputTypeAttribute | undefined,
    placeholder?: string
    onChangeHandler: Function

}

export default FormField