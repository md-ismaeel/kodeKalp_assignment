import React from 'react'
import { useSelector } from "react-redux"

export default function Login() {
    const { user } = useSelector((state) => state.userSlice);
    console.log(user);

    return (
        <section className=''>
            login
        </section>
    )
}

