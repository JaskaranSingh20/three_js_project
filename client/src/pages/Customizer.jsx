import React , {useState, useEffect }from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import config from '../config/config';
import state from '../store';
import {download} from '../assets';
import {downloadCanvasToImage, reader} from '../config/helpers';
import {EditorTabs, FilterTabs, DecalTypes} from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import axios from "axios";
import {AIPicker, ColorPicker, CustomButton, FilePicker , Tab} from '../components'


const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState('');   // to upload the files
  const [prompt, setPrompt] = useState('');   // AI prompt

  const[generatingImg, setGeneratingImg] = useState(false);

  // which editor tab is clicked
  const [activeEditorTab, setActiveEditorTab] = useState('');

  // which filter tab is clicked
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });


  const generateTabContent = () =>{

    switch(activeEditorTab){
      case "colorpicker":
        return <ColorPicker/>
      case "filepicker":
        return <FilePicker
                file = {file}
                setFile={setFile}
                readFile={readFile}/>
      case "aipicker":
        return <AIPicker
        prompt={prompt}
        setPrompt={setPrompt}
        generatingImg={generatingImg}
        handleSubmit={handleSubmit}/>
      
      default:
        return null;
    }
  }


  // handleDecals func is  responsible for change in global state of store

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];    // DecalTypes is an object and DecalTypes[type] is also object

    state[decalType.stateProperty] = result;   // sp contains logoDecal or fullDecal 

    if(!activeFilterTab[decalType.filterTab]) {   // logoShirt or stylishShirt is false
      handleActiveFilterTab(decalType.filterTab)
    }
  }


  // UI of filtertab is done in handleActiveFilterTab function

  const handleActiveFilterTab = (tabName) => {  
    switch (tabName) {
      case "logoShirt":
          state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
          state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    // after setting the state, activeFilterTab is updated

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  }

  
// readFile func is called when filePicker button is clicked i.e. (logo and full buttons)

  const readFile = (type) => {      // type is nothing but (logo) or (full)
    reader(file)                              // reader from helper.js
      .then((result) => {   
        handleDecals(type, result);    
        setActiveEditorTab("");
      })
  }

  
  const handleSubmit = async (type)=>{
    if(!prompt) return alert("Please enter a prompt");
    try{
      // call our backend to generate an AI image
      setGeneratingImg(true);

      //    route ->  /api/v1/dalle

      const image = await axios.post("http://localhost:8080/api/v1/openjourney/",
        JSON.stringify({
              prompt,
            }) ,
             { responseType: "blob", headers: {'Content-Type': 'application/json' }}); 
      
      const reader = new FileReader();
      reader.readAsDataURL(image.data);

      let base64URL;
      reader.onloadend = function() {
        base64URL = reader.result; // data url
        // console.log("baseurl "+ base64URL);
        handleDecals(type, base64URL)
      };

    }catch(error){
      // alert(error);
      console.log(error);
    }finally{
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  }

  return (
    <AnimatePresence>
      {
        !snap.intro && (
          <>
          <motion.div className='absolute top-0 left-0 z-10'
          key = 'custom' {...slideAnimation('left')}>

            <div className='flex items-center min-h-screen'>
             <div className='editortabs-container tabs'>
                {EditorTabs.map((val)=>(
                  <Tab key = {val.name}
                  tab = {val}
                  handleClick = {()=> {setActiveEditorTab(val.name)} }/>)
                )}

                {generateTabContent()}
             </div>
            </div>
          </motion.div>

          <motion.div className='absolute z-10 top-5 right-5'
            {...fadeAnimation} >
            <CustomButton
              type="filled"
              title= "Go Back"
              handleClick={()=> state.intro = true}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm "/>
          </motion.div>

          <motion.div className='filtertabs-container'
            {...slideAnimation('up')}>
              {FilterTabs.map((val)=>(
                  <Tab key = {val.name}
                  tab = {val}
                  isFilterTab="true"
                  isActiveTab={activeFilterTab[val.name]}
                  handleClick = {()=> {handleActiveFilterTab(val.name)} }/>)
                )}
          </motion.div>
          </>
        )
      }
    </AnimatePresence>
  )
}

export default Customizer