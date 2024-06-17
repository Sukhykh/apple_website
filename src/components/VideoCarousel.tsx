import { highlightsSlides } from '@constants/index'
import { useGSAP } from '@gsap/react'
import { VideoSettings } from '@shared/index'
import { pauseImg, playImg, replayImg } from '@utils/index'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useEffect, useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger)

const VideoCarousel = () => {
	const videoRef = useRef<(HTMLVideoElement | null)[]>([])
	const videoSpanRef = useRef<(HTMLSpanElement | null)[]>([])
	const videoDivRef = useRef<(HTMLSpanElement | null)[]>([])

	const [video, setVideo] = useState<VideoSettings>({
		videoId: 0,
		isLastVideo: false,
		isEnd: false,
		startPlay: false,
		isPlaying: false,
	})

	const [loadedData, setLoadedData] = useState<
		React.SyntheticEvent<HTMLVideoElement>[]
	>([])

	const { videoId, isLastVideo, isEnd, startPlay, isPlaying } = video

	useGSAP(() => {
		gsap.to('#slider', {
			transform: `translateX(${-100 * videoId}%)`,
			duration: 2,
			ease: 'power2.inOut',
		})
		gsap.to('#video', {
			scrollTrigger: {
				trigger: '#video',
				toggleActions: 'restart none none none',
			},
			onComplete: () => {
				setVideo(prev => ({
					...prev,
					startPlay: true,
					isPlaying: true,
				}))
			},
		})
	}, [isEnd, videoId])

	useEffect(() => {
		if (loadedData.length > 3) {
			const currentVideo = videoRef.current[videoId]
			if (currentVideo) {
				if (!isPlaying) {
					currentVideo.pause()
				} else {
					startPlay && currentVideo.play()
				}
			}
		}
	}, [startPlay, videoId, isPlaying, loadedData])

	const handleLoadedMetadata = (
		event: React.SyntheticEvent<HTMLVideoElement>
	) => setLoadedData(prev => [...prev, event])

	useEffect(() => {
		let currentProgress = 0
		const span = videoSpanRef.current

		if (span[videoId]) {
			const anim = gsap.to(span[videoId], {
				onUpdate: () => {
					const progress = Math.ceil(anim.progress() * 100)

					if (progress != currentProgress) {
						currentProgress = progress

						gsap.to(videoDivRef.current[videoId], {
							width:
								window.innerWidth < 760
									? '10vw'
									: window.innerWidth < 1200
									? '10vw'
									: '4vw',
						})

						gsap.to(span[videoId], {
							width: `${currentProgress}%`,
							backgroundColor: 'white',
						})
					}
				},

				onComplete: () => {
					if (isPlaying) {
						gsap.to(videoDivRef.current[videoId], {
							width: '12px',
						})
						gsap.to(span[videoId], {
							backgroundColor: '#afafaf',
						})
					}
				},
			})

			if (videoId === 0) {
				anim.restart()
			}

			const animUpdate = () => {
				const currentVideo = videoRef.current[videoId]
				if (currentVideo) {
					anim.progress(
						currentVideo.currentTime / highlightsSlides[videoId].videoDuration
					)
				}
			}

			if (isPlaying) {
				gsap.ticker.add(animUpdate)
			} else {
				gsap.ticker.remove(animUpdate)
			}
		}
	}, [videoId, startPlay, isPlaying])

	const handleProcess = (
		type: string,
		i: number
	): VideoSettings | undefined => {
		switch (type) {
			case 'video-end':
				setVideo(prev => ({ ...prev, isEnd: true, videoId: i + 1 }))
				break
			case 'video-last':
				setVideo(prev => ({ ...prev, isLastVideo: true }))
				break
			case 'video-reset':
				setVideo(prev => ({ ...prev, isLastVideo: false, videoId: 0 }))
				break
			case 'play':
				setVideo(prev => ({ ...prev, isPlaying: !prev.isPlaying }))
				break
			case 'pause':
				setVideo(prev => ({ ...prev, isPlaying: !prev.isPlaying }))
				break
			default:
				return video
		}
	}

	return (
		<>
			<div className='flex items-center'>
				{highlightsSlides.map((item, index) => (
					<div className='sm:pr-20, pr-10' key={item.id} id='slider'>
						<div className='video-carousel_container'>
							<div className='w-full h-full flex-center rounded-3xl overflow-hidden bg-black'>
								<video
									className={`${
										item.id === 2 && 'translate-x-44'
									} pointer-events-none`}
									id='video'
									playsInline
									muted
									preload='auto'
									ref={el => (videoRef.current[index] = el)}
									onEnded={() => {
										index !== 3
											? handleProcess('video-end', index)
											: handleProcess('video-last', index)
									}}
									onPlay={() => {
										setVideo(prevVideo => ({
											...prevVideo,
											isPlaying: true,
										}))
									}}
									onLoadedMetadata={event =>
										handleLoadedMetadata(event)
									}>
									<source src={item.video} type='video/mp4' />
								</video>
							</div>

							<div className='absolute top-12 left-[5%] z-10'>
								{item.textLists.map(text => (
									<p className='md:text-2xl text-xl font-medium' key={text}>
										{text}
									</p>
								))}
							</div>
						</div>
					</div>
				))}
			</div>

			<div className='relative flex-center mt-10'>
				<div className='flex-center p-5 px-7 bg-gray-300 backdrop-blur rounded-full'>
					{videoRef.current.map((_, index) => (
						<span
							className='mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer'
							key={index}
							ref={el => (videoDivRef.current[index] = el)}>
							<span
								className='absolute h-full w-full rounded-full'
								ref={el => (videoSpanRef.current[index] = el)}
							/>
						</span>
					))}
				</div>

				<button className='control-btn'>
					<img
						src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
						alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'}
						title={isLastVideo ? 'Replay' : !isPlaying ? 'Play' : 'Pause'}
						onClick={
							isLastVideo
								? () => handleProcess('video-reset', 0)
								: !isPlaying
								? () => handleProcess('play', videoId)
								: () => handleProcess('pause', videoId)
						}
					/>
				</button>
			</div>
		</>
	)
}

export default VideoCarousel
