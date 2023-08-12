'use client'
import React, { useState } from "react";
import Image from "next/image";
import {signIn, useSession, signOut} from 'next-auth/react'
import {AiOutlineMenu} from 'react-icons/ai'
import Link from "next/link";
const Header = ()=>{
    
    const {status, data} = useSession() 
    const [menuIsOpen, setMenuIsOpen] = useState(false)

    const handleMenuClick = ()=> setMenuIsOpen(!menuIsOpen)
    const handleLoginClick = () => signIn()
    const handleLogoutClick = ()=> {signOut(); handleMenuClick()}
    
   return (
    <div className="container mx-auto p-5 py-0 h-[93px] flex justify-between items-center">
        <Link href='/'>
            <div className="relative h-[32px] w-[182px]">
                <Image src="/logo.png" alt="Full Stack Week" fill />
            </div>
        </Link>
        {status === 'unauthenticated' && (
            <button className="text-primary text-sm font-semibold" onClick={handleLoginClick}>Login</button>
        )}
        {status === 'authenticated' &&  data.user &&(
            <div className="flex items-center gap-3 border-grayLighter border border-solid p-2 px-3 rounded-md relative">
                <AiOutlineMenu size={16} className="cursor-pointer"  onClick={handleMenuClick}/>
                <Image height={32} width={32} alt={data.user.name!} src={data.user.image!}
                className="rounded-full shadow-md"/>
                {menuIsOpen && (
                    <div 
                    className="z-50 absolute top-14 left-0 w-full h-[100px] bg-white rounded-lg shadow-md flex flex-col justify-center items-center">
                        <Link href='/my-trips'>
                        <button  className="text-primary text-sm font-semibold pb-2 border-b border-solid border-grayLighter" >
                            My trips
                        </button>
                        </Link>
                        <button className="text-primary text-sm font-semibold pt-2" onClick={handleLogoutClick}>logout</button>
                    </div>
                )}
            </div>
        )}
    </div>
   ) 
}

export default Header