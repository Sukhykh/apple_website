import Hero from '@components/Hero'
import Highlights from '@components/Highlights'
import Model from '@components/Model'
import Navigation from '@components/Navigation'

const App = () => {
	return (
		<main className='bg-black'>
			<Navigation />
			<Hero />
			<Highlights />
			<Model />
		</main>
	)
}

export default App
