import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { ICON_CONSTANTS, resolveIcon } from '@/utils/IconConstants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const PopoverMenu = ({ position, updateIcon }: Props) => {


    return <div className={position + " w-full max-w-sm px-4"}>
        <Popover className="relative">
            {({ open }) => (
                <>
                    <Popover.Button
                        className={`
          ${open ? '' : 'text-opacity-90'}
          group inline-flex items-center rounded-full bg-violet-800 hover:bg-violet-900 px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                    >
                        <span>V</span>

                    </Popover.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel className="absolute z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-l">
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="relative text-white grid gap-8 bg-white dark:bg-gray-700 dark:border-gray-600 shadow-md p-7 lg:grid-cols-5">
                                    {ICON_CONSTANTS.map((item) => (
                                        <Popover.Button key={item} onClick={() => updateIcon(item)}>

                                            <a
                                                key={item}
                                                className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-600 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                            >
                                                <div className="flex h-10 w-10 shrink-0 items-center text-3xl justify-center text-white sm:h-12 sm:w-12">
                                                    <FontAwesomeIcon icon={resolveIcon(item)} style={{ color: "#ffffff", }} />
                                                </div>

                                            </a>
                                        </Popover.Button>
                                    ))}
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    </div>
}

type Props = {
    position: string,
    updateIcon: (icon: string) => void
}

export default PopoverMenu