import { navLists } from '@constants/index'
import { appleImg, bagImg, searchImg } from '@utils/index'

const Navigation = () => {
	return (
		<header className='w-full py-5 sm:px-10 px-5 flex justify-between items-center'>
			<nav className='flex w-full screen-max-width'>
				<img src={ appleImg } alt='Apple' title='Apple' width={14} height={18}/>

				<div className='flex flex-1 justify-center max-sm:hidden'>
					{navLists.map((nav: string) => (
						<div key={nav} className='px-5 text-sm cursor-pointer text-gray hover:text-white transition-all'>
							{nav}
						</div>
					))}
				</div>

				<div className='flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1'>
					<img src={ searchImg } alt="search" title='Search' width={18} height={18}/>
					<img src={ bagImg } alt="bag" title='Bag' width={18} height={18}/>
				</div>
			</nav>
		</header>
	)
}

export default Navigation;
