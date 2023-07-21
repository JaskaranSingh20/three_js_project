import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import state from '../store';


const CameraRig = ({children}) => {

  const group = useRef();  // group will refer to shirt model 
  const snap = useSnapshot(state);

  useFrame((st, delta)=>{
    // function will be executed on each frame update
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    let targetPostion = [0.4, 0, 2];   // for laptops

    if(snap.intro){   // home page 
      if(isBreakpoint){ 
        targetPostion = [0.4,0,2];
        
      }
      if(isMobile){ 
        targetPostion = [0, -0.35  , 2.5];
        
      }
    }else{   // customizer page 

      if(isMobile) targetPostion = [0, 0 , 2.5];
      else targetPostion = [0, 0, 2];
    }

    // set the model position according to camera & (group.current.position is shirt's position)
    easing.damp3(group.current.position, targetPostion, 0.1, delta);

    // set the model rotation smoothly & (group.current.rotation is shirt's rotation)
    easing.dampE(group.current.rotation, [st.pointer.y / 10, -st.pointer.x / 5, 0], 0.1, delta)

  })


  // console.log(group.current);

  return (
    <group ref={group}  >{children}</group>
  )
}

export default CameraRig