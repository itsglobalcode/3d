import { useRef, useEffect, useState } from 'react'
import birdScene from '../assets/3d/bird.glb'
import { useGLTF, useAnimations, Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

const Bird = ({ onBirdClick }) => {
  const birdRef = useRef()
  const { scene, animations } = useGLTF(birdScene)
  // useAnimations must target the scene root — clone so it doesn't share state
  const { actions } = useAnimations(animations, birdRef)
  const [hovered, setHovered] = useState(false)
  const pointerDown = useRef(null)

  useEffect(() => {
    if (!actions) return
    const first = Object.values(actions)[0]
    if (first) first.play()
  }, [actions])

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
    return () => { document.body.style.cursor = 'auto' }
  }, [hovered])

  useFrame((state) => {
    if (!birdRef.current) return
    // Slow, wide, lazy orbit — easy to click
    const t = state.clock.elapsedTime * 0.18
    const rx = 9    // horizontal radius
    const rz = 5    // depth radius
    birdRef.current.position.x = Math.sin(t) * rx
    birdRef.current.position.z = Math.cos(t) * rz - 4
    birdRef.current.position.y = 5 + Math.sin(t * 2.3) * 0.8

    // Face the direction of travel
    const vx = Math.cos(t) * rx * 0.18
    const vz = -Math.sin(t) * rz * 0.18
    birdRef.current.rotation.y = Math.atan2(vx, vz)
    birdRef.current.rotation.z = -Math.sin(t) * 0.12
  })

  return (
    <group ref={birdRef}>
      <primitive object={scene} scale={[0.003, 0.003, 0.003]} />
      {/* Invisible sphere hitbox — large enough to catch clicks easily */}
      <mesh
        onPointerDown={(e) => {
          e.stopPropagation()
          pointerDown.current = { x: e.clientX, y: e.clientY }
        }}
        onPointerUp={(e) => {
          e.stopPropagation()
          if (!pointerDown.current) return
          const dx = Math.abs(e.clientX - pointerDown.current.x)
          const dy = Math.abs(e.clientY - pointerDown.current.y)
          pointerDown.current = null
          if (dx < 6 && dy < 6 && onBirdClick) onBirdClick()
        }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1.2, 12, 12]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {hovered && (
        <Html center distanceFactor={4} style={{ pointerEvents: 'none', userSelect: 'none' }}>
          <div className="tooltip-label-big">
            <span>try to catch me</span>
            <span className="tooltip-arrow">&#8599;</span>
          </div>
        </Html>
      )}
    </group>
  )
}

export default Bird
