import React, { useState } from 'react'
import { cssClass } from '../../Components/cssModule'
import { Loader } from '../../Components/Loader'

export default function NewPassword() {
    const [newPassword, seNewPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try { } catch (error) { } finally { }
    }
    return (
        <>
            <section className="w-full h-auto flex justify-center items-center">
                <div className="w-full min-h-screen flex justify-center items-center">
                    <form onSubmit={handleSubmit} className={`w-[400px] min-h-[250px] bg-white flex flex-col justify-start items-center gap-2 border rounded-3xl`}>
                        <p className='mb-5 mt-10'>set new password</p>
                        <input type='text' value={newPassword} onChange={(e) => seNewPassword(e.target.value)} placeholder='Email Address' className={`${cssClass.inputCss}`} />
                        <button
                            type="submit"
                            className={`relative ${cssClass.buttonCss} ${loading ? "cursor-not-allowed" : ""
                                }`}
                        >
                            {loading ? (
                                <div>
                                    <Loader />
                                    <span>Loading...</span>
                                </div>
                            ) : (
                                "Reset"
                            )}
                        </button>

                    </form>
                </div>
            </section>
        </>
    )
}
