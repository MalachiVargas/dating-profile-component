import React from 'react'
import { StyleSheet, View } from 'react-native'
import Tile from './Tile'
import MovableTile from './MovableTile'
import { useSharedValue } from 'react-native-reanimated'

const styles = StyleSheet.create({
  galleryContainer: {
    height: 379,
    width: 346,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    borderWidth: 1,
    gap: 8
  },
  gridItem: {
    height: 120,
    width: 109,
    borderRadius: 8,
    backgroundColor: '#F3F3F3'
  }
})

function listToObject(list) {
  const values = Object.values(list)
  const object = {}

  for (let i = 0; i < values.length; i++) {
    object[values[i].id] = i
  }

  return object
}

const Gallery = ({ tileInfo }) => {
  const positions = useSharedValue(listToObject(tileInfo))
  return (
    <View style={styles.galleryContainer}>
      {tileInfo.map((tile) => {
        return (
          <MovableTile
            key={tile.id}
            positions={positions}
            id={tile.id}
            style={tile.style}
          >
            <Tile tile={tile}></Tile>
          </MovableTile>
        )
      })}
    </View>
  )
}

export default Gallery
