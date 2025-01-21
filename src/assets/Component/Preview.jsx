import React from 'react'
import Logo from './Logo'
import Lable from './Lable'
import { IoDownloadSharp, IoHome, IoPrintSharp, IoQrCode } from "react-icons/io5";
import { Link } from 'react-router-dom';


function Preview() {
  return (
    <div className='w-full min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-evenly flex-col'>

        <Logo />
        <div className='w-3/5 h-[80vw] bg-red-200 relative overflow-hidden rounded-3xl'>
        <Lable /></div>
        <div className='flex items-center justify-center gap-10 text-zinc-200 text-[3vw]'>
            <button className='border-[2px] border-zinc-300 p-2 rounded-lg hover:bg-zinc-800 bg-zinc-700'>
                <IoPrintSharp />
            </button>
            <button className='border-[2px] border-zinc-300 p-2 rounded-lg hover:bg-zinc-800 bg-zinc-700'>
                <IoDownloadSharp />
            </button>
            <button className='border-[2px] border-zinc-300 p-2 rounded-lg hover:bg-zinc-800 bg-zinc-700'>
                <IoQrCode />
            </button>
            <Link to="/home"><button className='border-[2px] border-zinc-300 p-2 rounded-lg hover:bg-zinc-800 bg-zinc-700'>
                <IoHome />
            </button></Link>
        </div>
    </div>
    
  )
}

export default Preview