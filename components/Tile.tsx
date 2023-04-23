import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { Positions, getOrder, getPosition } from '../Config'

export const styles = StyleSheet.create({
  gridItemStructure: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: '100%',
    width: '100%'
  }
})

interface TileProps {
  id: string
  handlePress: () => void
}

const Tile = ({ id, handlePress }: TileProps) => {
  return (
    <Pressable onPress={handlePress}>
      <AntDesign name="plus" size={32} color="#5A5A5A" />
    </Pressable>
  )
}

export default Tile
