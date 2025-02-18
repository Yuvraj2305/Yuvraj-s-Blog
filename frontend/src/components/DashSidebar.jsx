import React from 'react'
import { Sidebar } from 'flowbite-react'
import {HiUser,HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiChartPie} from 'react-icons/hi'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { signoutSuccess } from '../redux/user/userSlice'

export default function DashSidebar() {
  const { currentUser } = useSelector(state => state.user)
     const location =useLocation()
  const [tab, setTab] = useState('')
  const dispatch = useDispatch()
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFormUrl = urlParams.get('tab')
    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [location.search]
  );
   const handleSignout = async () => {
    try {
      const res = await fetch(`/api/user/signout`, {
        method:'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess(data));
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
      <Sidebar className='w-full md:w-56'>
          <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
          {
            currentUser && currentUser.isAdmin && (
              <Link to='/dashboard?tab=dash'>
                       <Sidebar.Item active={tab==='dash'||!tab} icon={HiChartPie} labelColor='dark' as='div' >
                      Dashboard
                      </Sidebar.Item>
          </Link>
            )
          }
                  <Link to='/dashboard?tab=profile'>
                       <Sidebar.Item active={tab==='profile'} icon={HiUser} label={currentUser.isAdmin ? 'admin':'user'} labelColor='dark' as='div' >
                      Profile
                      </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && 
            
         ( <Link to='/dashboard?tab=posts'>
            <Sidebar.Item
              active={tab === 'posts'}
              icon={HiDocumentText} as='div'>
              Posts
            </Sidebar.Item>
          </Link>)
          }
          {currentUser.isAdmin && 
            
         ( <Link to='/dashboard?tab=users'>
            <Sidebar.Item
              active={tab === 'users'}
              icon={HiOutlineUserGroup} as='div'>
              users
            </Sidebar.Item>
          </Link>)
          }
                  <Sidebar.Item  icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignout}>
                      Sign Out
                  </Sidebar.Item>
              </Sidebar.ItemGroup>
          </Sidebar.Items>
   </Sidebar>
  )
}
