import React from 'react'
import AboutPG from '../../components/about/AboutPG'
import WhatWeDo from '../../components/about/WhatWeDo'
import WhatWeAre from '../../components/about/WhatWeAre'
import WhoWeServe from '../../components/about/WhoWeServe'

const About = () => {
  return (
    <div className='pt-20'>
    <AboutPG/>
    <WhatWeDo/>
    <WhatWeAre/>
    <WhoWeServe/>
    </div>
  )
}

export default About