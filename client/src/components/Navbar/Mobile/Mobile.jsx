import React from 'react'
import './mobile.css'

import { BellIcon, HomeIcon } from '@heroicons/react/24/solid'

const navigation = [
    { name: <HomeIcon className="h-7 w-7" aria-hidden="true" />, href: '#', current: true },
    {
        name: <span className="h-7 w-7" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  stroke="currentColor" className="h-7 w-7">
            <path d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
        </svg>
        </span>, href: '#', current: false
    },
    {
        name: <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
            </svg>
        </span>, href: '#', current: false
    },
    { name: <BellIcon className="h-7 w-7" aria-hidden="true" />, href: '#', current: false },
]
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


function Mobile() {
    return (
        <div>
            <section id="bottom-navigation" className="block fixed inset-x-0 bottom-0 z-10 bg-[#0f213ede]  shadow px-4 sm:px-3 lg:px-2 mobile-menu">
                <div id="tabs" className="flex justify-between items-center">
                    {navigation.map((item, index) => (
                        <a
                            key={index}
                            href={item.href}
                            className={classNames(
                                item.current
                                    ? ' text-white'
                                    : 'text-[#A0ADB4] hover:text-white',
                                'px-3 py-2 rounded-md text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                        >
                            {item.name}
                        </a>
                    ))}
                    
                </div>
            </section>
        </div>
    )
}

export default Mobile
