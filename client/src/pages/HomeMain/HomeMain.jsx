import React, { useEffect } from 'react'
import axios from 'axios'; import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import Header from '../../components/Navbar/Navbar'
import Mobile from '../../components/Navbar/Mobile/Mobile'

function HomeMain() {
    const Navigate = useNavigate()
    useEffect(() => {
        userAuthenticeted()
    }, [Navigate]);

    const userAuthenticeted = () => {
        axios.get("http://localhost:5000/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("userToken"),
            }
        }).then((response) => {
            console.log('dddd');
            if (!response.data.auth) Navigate("/login")
        });
    };

    return (
        <>
            <div className='bg-[#0F213E] min-h-screen'>
                <div className='hidden sm:block'>
                    <Header />
                </div>
                <div className='block sm:hidden'>
                    <Mobile />
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default HomeMain
