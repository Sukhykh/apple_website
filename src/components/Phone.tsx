import { models, sizes } from '@constants/index'
import { useGSAP } from '@gsap/react'
import { View } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Model } from '@shared/index'
import { animateWithGsapTimeline } from '@utils/animations'
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { Group } from 'three'
import PhoneView from '@components/PhoneView'

const Phone = () => {
	const [size, setSize] = useState<string>('small')
	const [model, setModel] = useState<Model>(models[0])

	const cameraControlSmall = useRef<Group>()
	const cameraControlLarge = useRef<Group>()

	const small = useRef<Group>(new Group())
	const large = useRef<Group>(new Group())

	const [smallRotation, setSmallRotation] = useState<number>(0)
	const [largeRotation, setLargeRotation] = useState<number>(0)

	const timeline = gsap.timeline()

	useEffect(() => {
		if (size === 'large') {
			animateWithGsapTimeline(
				timeline,
				small,
				smallRotation,
				'#view1',
				'#view2',
				{
					transform: 'translateX(-100%)',
					duration: 2,
				}
			)
		}

		if (size === 'small') {
			animateWithGsapTimeline(
				timeline,
				large,
				largeRotation,
				'#view2',
				'#view1',
				{
					transform: 'translateX(0)',
					duration: 2,
				}
			)
		}
	}, [largeRotation, size, smallRotation, timeline])

	useGSAP(() => {
		gsap.to('#heading', {
			y: 0,
			opacity: 1,
		})
	}, [])

	return (
		<section className='common-padding'>
			<div className='screen-max-width'>
				<h2 className='section-heading' id='heading'>
					Take a closer look
				</h2>

				<div className='flex flex-col items-center mt-5'>
					<div className='w-full h-[75vh] md:h-[90vh] overflow-hidden relative'>
						<PhoneView
							index={1}
							groupRef={small}
							gsapType='view1'
							controlRef={cameraControlSmall}
							setRotationState={setSmallRotation}
							item={model}
							size={size}
						/>

						<PhoneView
							index={2}
							groupRef={large}
							gsapType='view2'
							controlRef={cameraControlLarge}
							setRotationState={setLargeRotation}
							item={model}
							size={size}
						/>

						<Canvas
							className='w-full h-full'
							style={{
								position: 'fixed',
								top: 0,
								bottom: 0,
								left: 0,
								right: 0,
								overflow: 'hidden',
							}}
							eventSource={document.getElementById('root')!}>
							<View.Port />
						</Canvas>
					</div>

					<div className='mx-auto w-full'>
						<p className='text-m font-light text-center mb-5'>{model.title}</p>

						<div className='flex-center'>
							<ul className='color-container'>
								{models.map((item, index) => (
									<li
										className='w-6 h-6 rounded-full mx-2 cursor-pointer'
										style={{ backgroundColor: item.color[0] }}
										key={index}
										onClick={() => setModel(item)}
									/>
								))}
							</ul>

							<button className='size-btn-container'>
								{sizes.map(({ label, value }) => (
									<span
										className='size-btn'
										style={{
											backgroundColor: size === value ? 'white' : 'transparent',
											color: size === value ? 'black' : 'white',
										}}
										key={label}
										onClick={() => setSize(value)}>
										{label}
									</span>
								))}
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Phone
