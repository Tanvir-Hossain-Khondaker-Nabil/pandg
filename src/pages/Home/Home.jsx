import React from 'react'
import LargeHeroText from '../../components/Home/LargeHeroText'
import OurPlanetCard from '../../components/Home/OurPlanetCard'
import AboutPandG from '../../components/Home/AboutPandG'
import JoiningPG from '../../components/Home/JoiningPG'
import KeyArea from '../../components/Home/KeyArea'
import BeforeFooterCard from '../../components/Home/BeforeFooterCard'

const Home = () => {
  return (
   <div className='pt-20'>
    <LargeHeroText/>
    <OurPlanetCard/>
    <AboutPandG/>
    <KeyArea/>
    <JoiningPG/>
    <BeforeFooterCard/>
    </div>
  )
}

export default Home