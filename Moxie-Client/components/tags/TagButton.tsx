import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Tag } from "./AddTagModal"

const TagButton = ({ tag, openModal }: Props) => {
    return (
        <div>
            <button
                onClick={openModal}
                className="bg-gray-100 group text-gray-800 text-sm font-medium mr-2 px-2.5 w-fit space-x-4 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                <span>{tag.name}</span>
                <FontAwesomeIcon icon={faPenToSquare} className="dark:text-blue-500 group-hover:text-red-600" />
            </button>
        </div>
    )

}

type Props = {
    tag: Tag,
    openModal: () => void
}

export default TagButton