import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "material-react-toastify";
import axios from "axios";
import { BACKEND_END_POINT, requestOptions } from "../../Utils/utils";
import { setIsLogin } from "../Redux/Slice/userSlice";
import Cookies from "js-cookie"
import { Loader } from "./Loader";

const Logout = () => {

    const { isLogin } = useSelector((state) => state.PokemonSlice);
    const [logout, setLogout] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function handleLogout() {
        setLogout(true);
        try {
            const response = await axios.get(`${BACKEND_END_POINT}/logout`, requestOptions);
            if (response?.data?.success) {
                dispatch(setIsLogin(false));
                toast.success(response?.data?.message);
                Cookies.remove('token');
                navigate("/")
            }
        } catch (err) {
            console.warn("ERROR =>", err);
            toast.error(err?.response?.data?.message || "An error occurred.");
        } finally {
            setLogout(false);
        }
    }

    return (
        <>
            <button
                onClick={handleLogout}
                className="w-[112px] h-[45px] absolute top-4 right-2 inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold transition-all duration-150 ease-in-out cursor-pointer rounded-md hover:pl-10 hover:pr-6 bg-green-700 group"
            >
                <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-green-800 group-hover:h-full"></span>
                <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                    <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                    </svg>
                </span>
                <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                    <svg
                        className="w-5 h-5 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                    </svg>
                </span>
                <span className="relative w-full h-full text-white text-left transition-colors duration-200 ease-in-out group-hover:text-white">
                    {logout ? <div><Loader /><span>Loading...</span></div> : "Logout"}
                </span>
            </button>
        </>
    )
}

export default Logout