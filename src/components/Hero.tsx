import { useGSAP } from '@gsap/react'
import { heroVideo, smallHeroVideo } from '@utils/index'
import gsap from 'gsap'
import { useEffect, useState } from 'react'

const Hero = () => {
	const [videoSrc, setVideoSrc] = useState(
		window.innerWidth < 760 ? smallHeroVideo : heroVideo
	)

	const handleVideoStcSet = () => {
		window.innerWidth < 760
			? setVideoSrc(smallHeroVideo)
			: setVideoSrc(heroVideo)
	}

	useEffect(() => {
		window.addEventListener('resize', handleVideoStcSet)
		return () => {
			window.removeEventListener('resize', handleVideoStcSet)
		}
	}, [])

	useGSAP(() => {
		gsap.to('#hero', {
			opacity: 1,
			delay: 1.5,
		})
		
		gsap.to('#cta', {
			opacity: 1,
			delay: 2,
			y: -50
		})
	}, [])

	return (
		<section className='w-full nav-height bg-black relative'>
			<div className='h-5/6 w-full flex-center flex-col '>
				<h1 className='hero-title' id='hero'>
					iPhone 15 pro
				</h1>

				<div className='md:w-10/12 w-9/12'>
					<video
						className='pointer-events-none'
						autoPlay
						muted
						playsInline
						key={videoSrc}>
						<source src={videoSrc} type='video/mp4' />
					</video>
				</div>
			</div>

			<div className='flex flex-col items-center opacity-0 translate-y-20' id='cta'>
				<a className='btn' href="#highlights">Buy</a>
				<p className='font-normal text-xl'>From &#36;199/month or &#36;999</p>
			</div>
		</section>
	)
}

export default Hero
