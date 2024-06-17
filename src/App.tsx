import Hero from '@components/Hero'
import Highlights from '@components/Highlights'
import Navigation from '@components/Navigation'

const App = () => {
	return (
		<main className='bg-black'>
			<Navigation />
			<Hero />
			<Highlights />
		</main>
	)
}

export default App
