import React from 'react'

const NavBar = () => {
    return (
        <header className="fixed w-full top-0 left-0">
            <nav className="h-20 flex justify-between items-center px-20 backdrop-blur-sm">
                <a href="/" className="uppercase text-xl">
                    <span className="text-red-500 font-black">Fox</span>
                    <span>IFY</span>
                </a>
                <div className="flex gap-4">
                    <a href="/about">About team</a>
                    <a href="https://www.buymeacoffee.com/zerok" target={'_blank'}>Coffe ☕</a>
                </div>
            </nav>
        </header>
    )
}

export default NavBar