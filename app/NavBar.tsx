'use client';

import React from 'react'
import Link from 'next/link'
import { TbBugFilled } from "react-icons/tb";
import { usePathname } from 'next/navigation';
import classnames from 'classnames';

const NavBar = () => {

    const currentPath = usePathname();

    const navItemsList = [
        {href: "/", descr: "Dashboard"},
        {href: "/issues", descr: "Issues"}
    ]

  return (
    <div className='flex mb-5 px-5 border-b-2 space-x-6 h-14 items-center'>
        <Link href={"/"}><TbBugFilled /></Link>
        <ul className='flex space-x-6'>
            {navItemsList.map(item => 
                <li>
                    <Link 
                    key={item.href}
                    className= {
                        classnames({
                            'text-indigo-800': true,
                            'text-zinc-900': item.href === currentPath,
                            'hover:text-zinc-700': true,
                            'transition-colors': true
                        })
                    }
                    href={item.href}>
                        {item.descr}
                        </Link>
                </li>
                )}
        </ul>
    </div>
  )
}

export default NavBar