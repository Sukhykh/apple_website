import Lights from '@components/Lights'
import Loader from '@components/Loader'
import Scene from '@components/Scene'
import { OrbitControls, PerspectiveCamera, View } from '@react-three/drei'
import { Suspense } from 'react'
import { Vector3 } from 'three'

const ModelView = ({
	index,
	groupRef,
	gsapType,
	controlRef,
	setRotationState,
	item,
	size,
}) => {
	return (
		<View
			className={`w-full h-full absolute ${index === 2 ? 'right-[-100%]' : ''}`}
			index={index}
			id={gsapType}>
			<ambientLight intensity={0.5} />
			<PerspectiveCamera makeDefault position={[0, 0, 4]} />
			<Lights />
			<OrbitControls
				makeDefault
				ref={controlRef}
				enableZoom={false}
				enablePan={false}
				rotateSpeed={0.4}
				target={new Vector3(0, 0, 0)}
				onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
			/>
			<group
				ref={groupRef}
				name={`${index === 1 ? 'small' : 'large'}`}
				position={[0, 0, 0]}>
				<Suspense fallback={<Loader />}>
					<Scene
						scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
						item={item}
						size={size}
					/>
				</Suspense>
			</group>
		</View>
	)
}

export default ModelView
