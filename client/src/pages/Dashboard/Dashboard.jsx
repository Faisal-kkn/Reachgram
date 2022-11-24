import React from 'react'
import { HomeIcon, UserIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/solid';
import { Link, Outlet } from 'react-router-dom'

function Dashboard() {
  return (
    <div>

      <aside className="fixed inset-y-0 left-0 bg-white shadow-md max-h-screen w-60">
        <div className="flex flex-col justify-between h-full">
          <div className="flex-grow">
            <div className="px-4 py-6 text-center border-b">
              <h1 className="text-xl font-bold leading-none"><span className="text-yellow-700">L</span>ogo</h1>
            </div>
            <div className="p-4">
              <ul className="space-y-1">
                <li>
                  <Link to='/admin' className="flex gap-2 items-center bg-[#0F213E] rounded-[10px] font-bold text-sm text-white py-3 px-4">
                    <HomeIcon className='w-8 h-8' />  Dashbord
                  </Link>
                </li>
                <li>
                  <Link to='/admin/users' className="flex items-center gap-2 bg-white hover:text-white hover:bg-[#0f213e2b] rounded-[10px] font-bold text-sm text-gray-900 py-3 px-4">
                    <UserIcon className='w-8 h-8' />  Users
                  </Link>
                </li>
                <li>
                  <Link to='/admin/posts' className="flex items-center gap-2 bg-white hover:text-white hover:bg-[#0f213e2b] rounded-[10px] font-bold text-sm text-gray-900 py-3 px-4">
                    <ClipboardDocumentCheckIcon className='w-8 h-8' />  Posts
                  </Link>
                </li>
                
              </ul>
            </div>
          </div>
          <div className="p-4">
            <button type="button" className="inline-flex items-center justify-center h-9 px-4 rounded-xl bg-gray-900 text-gray-300 hover:text-white text-sm font-semibold transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="" viewBox="0 0 16 16">
                <path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1h8zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
              </svg>
            </button> <span className="font-bold text-sm ml-2">Logout</span>
          </div>
        </div>
      </aside>

      <main className="ml-60 max-h-screen overflow-auto">
        <div className="px-6 py-8">
          <div className="mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
