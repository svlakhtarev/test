import React, {FC} from 'react'
import preloader from '../../assets/images/1494.gif'

type PropsType = {}

let Preloader: FC<PropsType> = () => {
  return <img src={preloader} alt={''}/>
}

export default Preloader
