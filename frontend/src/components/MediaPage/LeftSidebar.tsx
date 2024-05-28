import { Link } from 'react-router-dom'

const LeftSidebar = () => {
  return (
    <section className='bg-blue-300 sticky left-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-auto border-r border-r-black pb-5 pt-28 max-md:hidden'>
        <div className='flex w-[250px] flex-1 flex-col gap-6 px-6'>
            <Link to={''}>
              follow communities
            </Link>
        </div>
    </section>
  )
}

export default LeftSidebar