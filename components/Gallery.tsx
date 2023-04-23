import React, { ReactElement } from 'react'
import { StyleSheet, View } from 'react-native'
import Tile from './Tile'
import MovableTile from './MovableTile'
import { useSharedValue } from 'react-native-reanimated'
import { Positions } from '../Config'

interface ListProps {
  children: ReactElement<{ id: string }>[]
}

const styles = StyleSheet.create({
  galleryContainer: {
    height: 376,
    width: 346,
    borderRadius: 20,
    position: 'relative'
  },
  gridItem: {
    height: 120,
    width: 109,
    borderRadius: 8,
    backgroundColor: '#F3F3F3'
  }
})

const Gallery = ({ children }: ListProps) => {
  const positions = useSharedValue<Positions>(
    Object.assign(
      {},
      ...children.map((child, index) => ({ [child.props.id]: index }))
    )
  )
  return (
    <View style={styles.galleryContainer}>
      {children.map((child) => {
        return (
          <MovableTile
            key={child.props.id}
            id={child.props.id}
            positions={positions}
          >
            {child}
          </MovableTile>
        )
      })}
    </View>
  )
}

export default Gallery
