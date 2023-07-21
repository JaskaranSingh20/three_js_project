import { proxy } from "valtio";

// proxy from valtio is used to create a global store of states 
//   #EFBD48 (original)

// 1D5D9B(blue)     #8f83d8(purple)
// 3AA6B9    4FC0D0

const state = proxy({
    intro: true,
    color: '#8f83d8',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: './threejs.png',
    fullDecal: './threejs.png',
  
});

export default state;