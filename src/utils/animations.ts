import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { MutableRefObject } from 'react'
import { Group } from 'three'

gsap.registerPlugin(ScrollTrigger)

export const animateWithGsapTimeline = (
	timeline: GSAPTimeline,
	rotationRef: MutableRefObject<Group>,
	rotationState: number,
	firstTarget: string,
	secondTarget: string,
	animationProps: Record<string, string | number>
) => {
	timeline.to(rotationRef.current.rotation, {
		y: rotationState,
		duration: 1,
		ease: 'power2.inOut',
	})

	timeline.to(
		firstTarget,
		{
			...animationProps,
			ease: 'power2.inOut',
		},
		'<'
	)

	timeline.to(
		secondTarget,
		{
			...animationProps,
			ease: 'power2.inOut',
		},
		'<'
	)
}

export const animateWithGsap = (
	target: string,
	animationProps: Record<string, string | number>,
	scrollProps?: Record<string, string | number>
) => {
	gsap.to(target, {
		...animationProps,
		scrollTrigger: {
			trigger: target,
			toggleActions: 'restart reverse restart reverse',
			start: 'top 85%',
			...scrollProps,
		},
	})
}
