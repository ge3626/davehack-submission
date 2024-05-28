import axios from 'axios';
import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import RankingBar from '@/components/Ranking/RankingBar';

type IRouteInFormat = {
  id: number;
  title: string;
  distance: number;
  time_taken: string;
  username: string;
  profile_img: string | null;
}

const Ranking = () => {
  const [allRoutes, setAllRoutes] = useState<IRouteInFormat[]>([]);
  const [top3Users, setTop3Users] = useState<IRouteInFormat[]>([]);
  const [otherUsers, setOtherUsers] = useState<IRouteInFormat[]>([]);
  
  useEffect(() => {
    const fetchRoutes = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/route/format`);
      setAllRoutes(response.data);
    }
    fetchRoutes();
  }, []);

  useEffect(() => {
    const sortedRoutes = [...allRoutes].sort((a, b) => b.distance - a.distance);
    setTop3Users(sortedRoutes.slice(0, 3));
    setOtherUsers(sortedRoutes.slice(3));
  }, [allRoutes]);
  

  return (
    <div className='h-screen'>
      <h1 className='font-semibold text-[32px] mx-12 py-4'>Ranking</h1>
      {(allRoutes && top3Users && otherUsers)? (
        <div className='w-1/2 mx-auto'>
          <div className="flex justify-center items-end space-x-4">
            {top3Users.length >= 2 && (
              <div className="flex-1 flex justify-end">
                <RankingBar 
                  username={top3Users[1].username}
                  profile_img={top3Users[1].profile_img}
                  distance={top3Users[1].distance}
                  barHeight='h-[100px]'
                  rank={2}
                />
              </div>
            )}
            {top3Users.length >= 1 && (
              <div className={`flex-1 flex ${top3Users.length === 1 ? 'justify-center' : 'justify-center'}`}>
                <RankingBar 
                  username={top3Users[0].username}
                  profile_img={top3Users[0].profile_img}
                  distance={top3Users[0].distance}
                  barHeight='h-[200px]'
                  rank={1}
                />
              </div>
            )}
            {top3Users.length === 3 && (
              <div className="flex-1 flex justify-start">
                <RankingBar 
                  username={top3Users[2].username}
                  profile_img={top3Users[2].profile_img}
                  distance={top3Users[2].distance}
                  barHeight='h-[50px]'
                  rank={3}
                />
              </div>
            )}
          </div>



          <Table>
            <TableHeader className='bg-slate-200'>
              <TableRow>
                <TableHead className="w-[100px]">Rank</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Distance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='bg-white'>
              {otherUsers.map((route, index) => (
                  <TableRow key={route.id}>
                    <TableCell>{index + 4}</TableCell>
                    <TableCell>{route.username}</TableCell>
                    <TableCell>{route.distance} km</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
      </div>
      ) : (
        <span>No routes</span>
      )}
    </div>
  )
}

export default Ranking