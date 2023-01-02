import React, { useEffect } from 'react'
import axios from 'axios'; import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import Header from '../../components/Navbar/Navbar'
import Mobile from '../../components/Navbar/Mobile/Mobile'
import { userAuth } from '../../Api/UserApi/UserRequest'

function HomeMain({ socket }) {
    const Navigate = useNavigate()
    useEffect(() => {
        userAuthenticeted()
    }, [Navigate]);

    const userAuthenticeted =async () => {
        try {
            const { data } = await userAuth()
            if (data.auth == false) Navigate("/login")
        } catch (error) {
            console.log(error, 'catch error');
        }
    };

    return (
        <>
            <div className='bg-[#0F213E] min-h-screen'>
                <div className='hidden sm:block'>
                    <Header socketio={socket} />
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
