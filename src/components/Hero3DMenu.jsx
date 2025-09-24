// Hero3DMenu.jsx
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

function MenuObject() {
  const ref = useRef();
  useFrame(({ mouse }) => {
    ref.current.rotation.x = mouse.y * 0.1;
    ref.current.rotation.y = mouse.x * 0.1;
  });
  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <boxGeometry args={[3, 0.2, 2]} />
      <meshStandardMaterial color="#a8d5ba" />
    </mesh>
  );
}

export default function Hero3DMenu() {
  return (
    <Canvas style={{ height: "60vh" }}>
      <ambientLight intensity={0.5} />
      <MenuObject />
    </Canvas>
  );
}
