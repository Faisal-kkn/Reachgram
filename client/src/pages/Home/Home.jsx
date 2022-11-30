import React from 'react'
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar'
import RightSideBar from '../../components/RightSideBar/RightSideBar'
import HomeMain from '../../components/HomeMain/HomeMain'
import Story from '../../components/Story/Story'
import './home.css'

function Home() {
    return (
        <>

            <div className='mx-auto max-w-7xl px-1 sm:px-3 lg:px-2 flex justify-between gap-3 w-12/12 pt-1 md:pt-3'>
                <div className='hidden lg:block w-3/12'><LeftSideBar /></div>
                <div className='lg:w-7/12 md:w-7/12 block'>
                    {/* <div className='mb-1 md:mb-3 '>
                        <Story />
                    </div> */}
                    <div className='overflow-y-scroll scrollbar-hide h-[95vh] lg:h-[90vh] md:h-[85vh] am:h-[90vh]  text-white rounded-t-[10px] scrollbar-hide'>
                        <HomeMain />
                    </div>
                </div>
                <div className='hidden md:block md:w-5/12 lg:w-3/12'><RightSideBar /></div>
            </div>

        </>
    )
}

export default Home
