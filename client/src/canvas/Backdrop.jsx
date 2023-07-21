import React, { useRef } from 'react';
import { easing } from 'maath';
import { useFrame } from '@react-three/fiber';
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei';

const Backdrop = () => {

  const shadows = useRef();

  useFrame((state, delta) => easing.dampC(shadows.current.getMesh().material.color, state.color, 0.25, delta))


  return (
    <AccumulativeShadows ref={shadows}
    receiveShadow
       temporal 
        frames={60}
         alphaTest={0.85}
          scale={10}
           rotation={[Math.PI / 2, 0, 0]}
            position={[0, 0, -0.14]}
            color='black'>

      <RandomizedLight 
        amount={4} 
          radius={9} 
            intensity={0.45}
               ambient={0.25}
              //  [ 5 , 10, 8] position
                position={[ 5,5, -10]} />

      <RandomizedLight amount={4} radius={5} intensity={0.15} ambient={0.55} position={[-5, 5, -9]} />
    </AccumulativeShadows>
  )
}

export default Backdrop