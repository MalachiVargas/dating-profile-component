import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

export const styles = StyleSheet.create({
  positionLabel: {
    position: 'absolute',
    bottom: 5,
    left: 10,
    height: 15,
    width: 15,
    borderRadius: 9999,
    opacity: '70%',
    backgroundColor: '#D3D3D3',
    padding: 4
  },
  firstPositionLabel: {
    position: 'absolute',
    bottom: 5,
    left: 10,
    borderRadius: 9999,
    opacity: '70%',
    backgroundColor: '#D3D3D3',
    padding: 4
  },
  positionLabelText: {
    color: 'white',
    textAlign: 'center',
    lineHeight: 9,
    fontSize: 9
  },
  gridItemStructure: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: '100%',
    width: '100%'
  }
})

const Tile = ({ children, tile }) => {
  return (
    <Pressable style={styles.gridItemStructure}>
      <AntDesign name="plus" size={32} color="#5A5A5A" />
      <View
        style={tile.id === 1 ? styles.firstPositionLabel : styles.positionLabel}
      >
        <Text style={styles.positionLabelText}>
          {tile.id === 1 ? 'Main photo' : tile.id}
        </Text>
        {children}
      </View>
    </Pressable>
  )
}

export default Tile
