import React from 'react'
import { TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

const BackButton = ({ iconName }) => {
  return (
    <TouchableOpacity>
      <AntDesign name={iconName} size={32} color="black" />
    </TouchableOpacity>
  )
}

export default BackButton
