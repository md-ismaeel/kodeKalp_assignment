import React from 'react'
import { Loader } from '../../Components/Loader'
import logo from "../../assets/kodekapl-logo.png"

export const Home = () => {
    return (
        <div className='relative w-full min-h-screen'>
            <div className=''>
                <h1 className='text-xl font-medium'>Welcome to kodeKalp</h1>
                <img src={logo} alt='logo' className='w-[300px] h-[300px]' />
            </div>
        </div>
    )
}

