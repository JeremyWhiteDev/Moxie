import { Combobox, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";


const MultiSelect = ({ items, label, selectedItems, setSelectedItems }: Props) => {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [filteredItems, setFilteredItems] = useState<any[]>([])

    useEffect(() => {
        if (items.length > 0) {
            setFilteredItems(items.filter(it => it.name.toLowerCase().includes(searchTerm.toLowerCase())))
        }
    }, [searchTerm])


    return <>
        <div
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
            {label}
        </div>
        <Combobox value={selectedItems} onChange={setSelectedItems} multiple>
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
            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <Combobox.Options className="py-1 text-sm overflow-auto max-h-48 shadow-lg dark:shadow-sm w-full max-w-md text-gray-700 dark:text-gray-200 divide-y rounded divide-gray-100 dark:divide-gray-600 absolute dark:bg-gray-700 bg-white z-30">
                    <div>
                        {filteredItems.map((item) => (
                            <Combobox.Option
                                key={item?.id}
                                value={item}
                                className={({ active }) =>
                                    `block relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-gray-100 dark:bg-gray-600 text-white' : 'text-white'}`}
                            >
                                {({ selected, active }) => (
                                    <>
                                        <span
                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                }`}
                                        >
                                            {item.name}
                                        </span>
                                        {selected ? (
                                            <span
                                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                                                    }`}
                                            >
                                                X
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            </Combobox.Option>
                        )
                        )}
                    </div>
                </Combobox.Options>
            </Transition>
        </Combobox >
    </>
}

type Props = {
    items: any[],
    label: string,
    selectedItems: any[],
    setSelectedItems: Dispatch<SetStateAction<any[]>>
}
export default MultiSelect

// onChange={(event) => setSearchTerm(event.target.value)}
// displayValue={(terms: any[]) => <span>{terms.map(element => element.name).join(", ")}</span>
// }
// onFocus={(event) => {
//     if (!event.target.value) {
//     }
// }}
// className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 relative"
// // displayValue={(category) => category.name}
// ></Combobox.Input>