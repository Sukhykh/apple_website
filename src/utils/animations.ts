import { MutableRefObject } from 'react'
import { Group } from 'three'

export const animateWithGsapTimeline = (
  timeline: GSAPTimeline,
  rotationRef: MutableRefObject<Group>,
  rotationState: number,
  firstTarget: string,
  secondTarget: string,
  animationProps: Record<string, any>
) => {
	timeline.to(rotationRef.current.rotation, {
		y: rotationState,
		duration: 1,
		ease: 'power2.inOut',
	})

	timeline.to(firstTarget, {
		...animationProps,
		ease: 'power2.inOut',
	}, '<')

	timeline.to(secondTarget, {
		...animationProps,
		ease: 'power2.inOut',
	}, '<')
}
