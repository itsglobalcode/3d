import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

import skyScene from '../assets/3d/sky.glb'

// Preload so it's always cached — survives route changes
useGLTF.preload(skyScene)

const Sky = ({ isRotating }) => {
  const skyRef = useRef()
  const sky = useGLTF(skyScene)

  useFrame((_, delta) => {
    if (!skyRef.current) return
    skyRef.current.rotation.y += (isRotating ? 0.15 : 0.02) * delta
  })

  return (
    <mesh ref={skyRef}>
      <primitive object={sky.scene} />
    </mesh>
  )
}

export default Sky
