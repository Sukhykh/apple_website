import Features from '@components/Features'
import Footer from '@components/Footer'
import Hero from '@components/Hero'
import Highlights from '@components/Highlights'
import HowItWorks from '@components/HowItWorks'
import Navigation from '@components/Navigation'
import Phone from '@components/Phone'
import * as Sentry from '@sentry/react'

const App = () => {
	return (
		<main className='bg-black'>
			<Navigation />
			<Hero />
			<Highlights />
			<Phone />
			<Features />
			<HowItWorks />
			<Footer />
		</main>
	)
}

const ProfiledApp = Sentry.withProfiler(App)

export default ProfiledApp
