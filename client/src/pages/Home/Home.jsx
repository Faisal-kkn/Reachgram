import React, { useEffect, useContext } from 'react'
import Header from '../../components/Navbar/Navbar'
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar'
import RightSideBar from '../../components/RightSideBar/RightSideBar'
import HomeMain from '../../components/HomeMain/HomeMain'
import Story from '../../components/Story/Story'
import Mobile from '../../components/Navbar/Mobile/Mobile'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './home.css'
import jwtDecode from 'jwt-decode'
import { UserContext } from '../../AppContext';

function Home() {
    const { setUserData } = useContext(UserContext);

    const Navigate = useNavigate()
    useEffect(() => {
        userAuthenticeted()
    }, []);

    const userAuthenticeted =() => {
        axios.get("http://localhost:5000/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("userToken"),
            },
        }).then((response) => {
            
            if (response.data.auth){
                let user = jwtDecode(localStorage.getItem("userToken"))
                setUserData({
                    id: user.user.split(' ')[0],
                    name: user.user.split(' ')[1]
                })
                Navigate('/')
            }else Navigate("/login");
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
                <div className='mx-auto max-w-7xl px-1 sm:px-3 lg:px-2 flex justify-between gap-3 w-12/12 pt-1 md:pt-3'>
                    <div className='hidden lg:block w-4/12'><LeftSideBar /></div>
                    <div className='lg:w-6/12 md:w-7/12 block'>
                        <div className='mb-1 md:mb-3 '>
                            <Story />
                        </div>
                        <div className='overflow-y-scroll scrollbar-hide h-[85vh] lg:h-[73vh] md:h-[85vh] am:h-[90vh]  text-white rounded-t-[10px] scrollbar-hide'>
                            <HomeMain />
                        </div>
                    </div>
                    <div className='hidden md:block w-5/12'><RightSideBar /></div>
                </div>
            </div>
        </>
    )
}

export default Home
