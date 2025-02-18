import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashboardComponent from '../components/DashboardComponent';


export default function Dashboard() {
  const location =useLocation()
  const  [tab, setTab ] = useState('')
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFormUrl = urlParams.get('tab')
    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [location.search]
  );

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className="md:w-56">
        {/* sidebar */}
        <DashSidebar/>
      </div>
      {/* profile */}
      {tab === 'profile' && <DashProfile />}
      {/* Dashboard overview */}
      {tab==='dash' && <DashboardComponent/>}
      {/* Posts */}
      {tab === 'posts' && <DashPosts />}
      {/* users */}
      {tab === 'users' && <DashUsers/>}
    </div>
  )
}
