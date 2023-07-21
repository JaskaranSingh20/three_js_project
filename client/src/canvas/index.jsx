import React, { useEffect, useState } from 'react';
import {Canvas, useFrame} from '@react-three/fiber'
import {Environment , Center } from '@react-three/drei';
import CameraRig from './CameraRig';
import Backdrop from './Backdrop';
import Shirt from './Shirt';
import { snapshot, useSnapshot } from 'valtio';
import state from '../store';


const CanvasModel = () => {

  const snap = useSnapshot(state);

  const isMobile = window.innerWidth <= 600;
  let newFov;
  
  if(isMobile){
    newFov = 30;
  }else{
    newFov = 20;
  }
  

  return (
    <Canvas
      shadows={true}
      camera={{position: [0, 0, 5],
      fov: newFov}}

      gl={{preserveDrawingBuffer: true
      }}
      className='w-full max-w-full h-full transition-all ease-in '
      >
      <ambientLight intensity={0.5} />
      <Environment preset='city' />

      <CameraRig >
        <Backdrop />
        <Center>
          <Shirt/>
        </Center>
      </CameraRig>
    </Canvas>
  )
}

export default CanvasModel