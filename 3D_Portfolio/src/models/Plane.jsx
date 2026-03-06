import { useRef, useEffect } from "react";
import planeScene from "../assets/3d/plane.glb";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Plane = ({ isRotating, ...props }) => {
  const ref = useRef();
  const { scene, animations } = useGLTF(planeScene);
  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    if (actions) {
      const actionNames = Object.keys(actions);
      if (actionNames.length > 0) {
        actions[actionNames[0]]?.play();
      }
    }
  }, [actions]);

  useFrame((state) => {
    if (!ref.current) return;
    if (isRotating) {
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 8) * 0.15;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 4) * 0.05;
      ref.current.position.y =
        (props.position?.[1] || 1.5) + Math.sin(state.clock.elapsedTime * 3) * 0.3;
    } else {
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5) * 0.03;
      ref.current.position.y =
        (props.position?.[1] || 1.5) + Math.sin(state.clock.elapsedTime * 1.2) * 0.12;
    }
  });

  return (
    <mesh ref={ref} {...props}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Plane;
