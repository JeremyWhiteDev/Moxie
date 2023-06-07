import { Combobox } from "@headlessui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";


const MultiSelect = ({ items, setItems }: Props) => {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [filterTerms, setFilterTerms] = useState([])

    useEffect(() => {
        if (items.length > 0) {

            const itemsCopy = [...items]
            itemsCopy.filter(it => it.name.toLowerCase().includes(searchTerm.toLowerCase()))

            setItems(itemsCopy)
        }
    }, [searchTerm])


    return <>
        <Combobox value={filterTerms} onChange={setFilterTerms}>
            <div className="flex relative">
                <Combobox.Input
                    onChange={(event) => setSearchTerm(event.target.value)}
                    onFocus={(event) => {
                        if (!event.target.value) {
                        }
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 relative"
                // displayValue={(category) => category.name}
                ></Combobox.Input>
                <Combobox.Button className="absolute  top-0 bottom-0 my-auto dark:text-gray-100 right-3">
                    v
                </Combobox.Button>
            </div>
            <Combobox.Options className="py-1 text-sm shadow-lg dark:shadow-sm w-72 md:w-96 text-gray-700 dark:text-gray-200 divide-y rounded divide-gray-100 dark:divide-gray-600 absolute dark:bg-gray-700 bg-white z-30">
                <div>
                    {items.map((item) => {
                        return (
                            <Combobox.Option
                                key={item?.id}
                                value={item}
                                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                {item?.name}
                            </Combobox.Option>
                        );
                    })}
                </div>
            </Combobox.Options>
        </Combobox>
    </>
}

type Props = {
    items: any[]
    setItems: Dispatch<SetStateAction<any[]>>
}
export default MultiSelect