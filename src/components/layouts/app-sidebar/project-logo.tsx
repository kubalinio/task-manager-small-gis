import { Link } from "components/common/link"
import { Logo } from "components/common/logo"

const ProjectLogo = () => {
  return (
    <Link to='/' variant='ghost' className='w-full flex-col text-sm'>
      <Logo className='h-10 w-32' />
      <span className='truncate font-semibold'>SmallGIS - Recruitment</span>
    </Link>
  )
}

export { ProjectLogo }
