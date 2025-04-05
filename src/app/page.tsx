import Home from "./home/page"
import { getAuthToken } from '@/lib/auth';
import { cookies } from 'next/headers';
export default function Page() {
  // const cookieStore = cookies();
  // const token = getAuthToken({ req: { cookies: cookieStore } });

  // if (!token) {
  //   return <>Загрузка....</>
  // }
  return (
    <Home/>
  )
}