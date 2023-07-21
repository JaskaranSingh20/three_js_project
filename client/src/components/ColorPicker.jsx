import React from 'react';
import {SketchPicker} from 'react-color';
import { useSnapshot } from 'valtio';
import state from '../store';


const ColorPicker = () => {
  const snap = useSnapshot(state);

  return (
    <>
    { !snap.intro && (
    <div className="absolute left-full ml-3">
      <SketchPicker color={snap.color} 
        disableAlpha
        onChange={(clr)=>{
            state.color = clr.hex;
        }}
        presetColors={[
          "#ccc",
          "#EFBD4E",
          "#80C670",
          "#726DE8",
          "#353934",
          "#2CCCE4",
          "#ff8a65",
          "#7098DA",
          "#C19277",
          "#FF96AD",
          "#3AA6B9",
          "#8f83d8"
        ]}/>
    </div>
    )}
   </>
  )
}

export default ColorPicker