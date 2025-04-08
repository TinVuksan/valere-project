'use client'
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const Dropdown = () => {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <MenuButton className="px-4 py-2 bg-blue-500 text-black rounded-lg">
                Favorites
            </MenuButton>
            <MenuItems className="absolute left-0 mt-2 w-48 bg-white ">
                <MenuItem>
                    <a href="#" className={`block px-4 py-2 text-black`}>
                        Option 1
                    </a>
                </MenuItem>
                <MenuItem>
                    <a href="#" className={`block px-4 py-2 text-black`}>
                        Option 233
                    </a>
                </MenuItem>
                <MenuItem>
                    <a href="#" className={`block px-4 py-2 text-black`}>
                        Option 3
                    </a>
                </MenuItem>
            </MenuItems>
        </Menu>
    )
}

export default Dropdown;