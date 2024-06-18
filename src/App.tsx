import Hero from '@components/Hero'
import Highlights from '@components/Highlights'
import Phone from '@components/Phone'
import Navigation from '@components/Navigation'

const App = () => {
	return (
		<main className='bg-black'>
			<Navigation />
			<Hero />
			<Highlights />
			<Phone />
		</main>
	)
}

export default App
