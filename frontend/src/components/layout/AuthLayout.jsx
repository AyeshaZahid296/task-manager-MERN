import React from 'react'
import uiImg from '../../assets/task-management-illu.avif';

const AuthLayout = ({ children }) => {
    return (
        <div className='flex'>
            <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
                <h2 className='text-lg font-medium text-black'>Task Manager</h2>
                {children}
            </div>
            <div className='hidden md:flex w-[40vw] h-screen items-center justify justify-center bg-blue-50 bg-[url(/task-priority-preview.jpg)] bg-cover bg-no-repeat overflow-hidden p-18' >
                <img src={uiImg} className='w-64 lg-w-[90%]' />
            </div>
        </div>
    )
}

export default AuthLayout