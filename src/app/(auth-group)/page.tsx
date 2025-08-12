'use client'
import AdminDashboard from '@/components/layout/AdminDashboard'
import AllProducts from '@/components/myUI/AllProducts'
import { useUserContext } from '@/contexts/UserContextProvider'

export default function Home() {
  const {user} = useUserContext()
  return (
    <div className='w-full '>
      <main className='flex w-full justify-between px-6'>
        <AllProducts />
        {user?.role == 'admin' && <AdminDashboard />}
      </main>
    
    </div>
  )
}
