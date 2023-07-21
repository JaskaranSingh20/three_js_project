import React from 'react'
import {easing} from 'maath';
import state from '../store'
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useTexture , useGLTF} from '@react-three/drei';


const Shirt = () => {
    const snap = useSnapshot(state);
    const {nodes, materials} = useGLTF('/shirt_baked.glb');

// unused_blue_vans_shoe.glb
    // const {nodes, materials} = useGLTF('/unused_blue_vans_shoe.glb');
    // console.log(gltf);

// nodes.Object_2.

// materials.Blue_Vans_Shoe

    const logoTexture = useTexture(snap.logoDecal);
    const fullTexture = useTexture(snap.fullDecal);

    useFrame((state, delta)=>{
      // to smoothly add the color
      easing.dampC(materials.lambert1.color, snap.color , 0.25, delta);
      // easing.dampC(materials.Blue_Vans_Shoe.color, snap.color , 0.25, delta);
    })

    const stateString = JSON.stringify(snap);
  return (
    <group
      key = {stateString}>
        <mesh
            castShadow
           geometry = {nodes.T_Shirt_male.geometry}
           material= {materials.lambert1}

          //  geometry = {nodes.Object_2.geometry}
          //  material= {materials.Blue_Vans_Shoe}
          //  rotation={[-Math.PI / 2, 0 , -Math.PI / 2]}
           material-roughness = {1}
           dispose={null}
           >
            {snap.isFullTexture && (
              <Decal position={[0,0,0]}
              rotation={[0,0,0]}
              scale={1}
              map={fullTexture} />
            )}

            {snap.isLogoTexture && (
              <Decal position={[0,0.04 ,0.15]}
              rotation={[0,0,0]}
              scale={0.15}
              map={logoTexture}
              depthTest={false}
              depthWrite={true}
               />
            )}

        </mesh>
    </group>
  )
}

export default Shirt