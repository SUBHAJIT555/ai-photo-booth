import React from 'react'
import Logo from './Logo'
import Lable from './Lable'
import { Link } from 'react-router-dom'

function Avatar() {
  return (
    <div className='w-full min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center gap-10 flex-col py-10'>
      <Logo />

      <div class="inline-flex items-center gap-2">
  <label for="switch-component-on" class="text-zinc-200 text-md cursor-pointer">Male</label>
 
  <div class="relative inline-block w-11 h-5">
    <input id="switch-component-on" type="checkbox" class="peer appearance-none w-11 h-5 bg-zinc-600 rounded-full checked:bg-zinc-600 cursor-pointer transition-colors duration-300" />
    <label for="switch-component-on" class="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-zinc-600 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-zinc-600 cursor-pointer">
    </label>
  </div>
 
  <label for="switch-component-on" class="text-zinc-200 text-md cursor-pointer">Female</label>
</div>

<div className="flex justify-center items-center gap-5 flex-wrap overflow-hidden px-[10vw]">
<div className='w-[20vw] h-[25vw] bg-red-300 rounded-xl overflow-hidden relative'>
  <Lable />
</div>
<div className='w-[20vw] h-[25vw] bg-red-200 rounded-xl overflow-hidden relative'><Lable /></div>
<div className='w-[20vw] h-[25vw] bg-red-200 rounded-xl overflow-hidden relative'><Lable /></div>
<div className='w-[20vw] h-[25vw] bg-red-200 rounded-xl overflow-hidden relative'><Lable /></div>
<div className='w-[20vw] h-[25vw] bg-red-200 rounded-xl overflow-hidden relative'><Lable /></div>
<div className='w-[20vw] h-[25vw] bg-red-200 rounded-xl overflow-hidden relative'><Lable /></div>
</div>


<Link to="/preview"><button className='capitalize text-zinc-200 tracking-tight font-light bg-zinc-700 py-2 px-5 rounded-full border-2 border-transparent hover:bg-zinc-900 hover:border-zinc-200'>
            swap
          </button></Link>



    </div>
    
  )
}

export default Avatar