import { Avatar } from '../ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'

interface Props {
    username: string;
    profile_img: string | null;
    distance: number;
    barHeight: string;
    rank: number;
}

const RankingBar = ({username, profile_img, distance, barHeight, rank } : Props) => {
  return (
    <div className='h-full flex flex-col gap-4 items-center'>
        <div className='flex flex-col'>
            <span>{distance == 0 ? distance : (distance/1000).toFixed(1)} km</span>
            <span className='font-semibold'>{username}</span>
        </div>
        <Avatar className='w-[90px] h-[90px]'>
            <AvatarImage src={profile_img || import.meta.env.VITE_DEFAULT_PIMG} />
        </Avatar>
        <div className={`bg-slate-300 w-[100px] ${barHeight} flex justify-center items-center`}>
            <span className='font-bold text-[22px]'>{rank}</span>
      </div>
    </div>
  )
}

export default RankingBar