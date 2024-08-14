import React, { useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";



function SIgnUp() {

  const [ShowLogin, setShowLogin] = useState(true);

  return (
    <div className=' fixed inset-0 bg-gray-200 bg-opacity-30 backdrop-blur-sm z-[9999] flex  justify-center items-center '  >
       <div className='w-[620px] h-[420px] relative p-2 flex items-center flex-col bg-white shadow-xl rounded-lg ' >

       <IoCloseSharp className=' absolute top-3 left-[94%] text-xl ' />

        <h1 className=' font-robotoBold text-[35px]  text-black ' >
        <span className='font-robotoRegular' > Get </span> started</h1>

        {
          ShowLogin ? (
            <>
            <p className='font-robotoRegular text-[16px] text-slate-700 ' > Please enter your email and password. </p>
        
        <form  className='mt-5 w-[98%] h-[260px]  flex flex-col items-center justify-evenly ' >
              
            <input required  name='email' placeholder='Email' className='rounded-3xl mt-2  placeholder:text-slate-600 border-none outline-none bg-gray-100 w-[92%]  h-[45px]  p-2 text-[18px] text-slate-300  px-4' type="email" />
            <input required  name='password' placeholder='Password' className='rounded-3xl mt-2  placeholder:text-slate-600 border-none outline-none bg-gray-100 w-[92%]  h-[45px] p-2 text-[18px] text-slate-300  px-4' type="password" />
            
            <button type='submit'  className='rounded-3xl mt-4 font-sans text-xl text-white font-semibold tracking-wider w-[92%] h-[45px] bg-[#000]' >Continue </button>

        </form>

        <h1 className='font-sans text-[22px] text-black'  > Don't an account? <span onClick={()=> setShowLogin(false)}  className='text-[#000] font-semibold cursor-pointer'> Register</span> </h1>
            </>
      ): (<>
        {/* register component */}
          <p className='font-robotoRegular text-[16px] text-slate-700 ' > Please enter your name, email and password. </p>
        
        <form  className='mt-5 w-[98%] h-[260px]  flex flex-col items-center justify-evenly ' >
              
            <input required  name='name' placeholder='Name' className='rounded-3xl  placeholder:text-slate-600 border-none outline-none bg-gray-100 w-[92%]  h-[45px]  p-2 text-[18px] text-slate-300   px-4' type="text" />
            <input required  name='email' placeholder='Email' className='rounded-3xl mt-2  placeholder:text-slate-600 border-none outline-none bg-gray-100 w-[92%]  h-[45px]  p-2 text-[18px] text-slate-300  px-4' type="email" />
            <input required  name='password' placeholder='Password' className='rounded-3xl mt-2  placeholder:text-slate-600 border-none outline-none bg-gray-100 w-[92%]  h-[45px] p-2 text-[18px] text-slate-300  px-4' type="password" />
            
            <button type='submit'  className='rounded-3xl mt-4 font-sans text-xl text-white font-semibold tracking-wider w-[92%] h-[45px] bg-[#000]' >Continue </button>

        </form>
        {/* login */}

        <h1 className='font-sans text-[22px] text-black'  > Have an account? <span onClick={()=> setShowLogin(true) }  className='text-[#000] font-semibold cursor-pointer'> Login</span> </h1>
          </>)
        }


       </div> 

    </div>
  )
}

export default SIgnUp