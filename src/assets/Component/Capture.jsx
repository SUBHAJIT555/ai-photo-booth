import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

function Capture() {
  return (
    
    <div className='w-full h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-evenly flex-col'>

        <Logo />

        <div className='captureArea w-1/2 h-1/2 bg-zinc-700 rounded-2xl'></div>

        <Link to="/submitorretake">
          <button className='capitalize text-zinc-200 tracking-tight font-light bg-zinc-700 py-3 px-5 rounded-full border-2 border-transparent hover:bg-zinc-900 hover:border-zinc-200'>
            click here to capture
          </button></Link>
        

    </div>
  )
}

export default Capture