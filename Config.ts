import { Dimensions } from 'react-native'
import { Easing } from 'react-native-reanimated'

export interface Positions {
  [id: string]: number
}

export const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 350
}

const { width } = Dimensions.get('window')
export const MARGIN = '4%'

export const TILE_POSITIONS = [
  { x: 0, y: 0 },
  { x: 236, y: 0 },
  { x: 236, y: 128 },
  { x: 0, y: 256 },
  { x: 118, y: 256 },
  { x: 236, y: 256 }
]

export const SPRING_CONFIG = {
  damping: 80,
  overshootClamping: true,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
  stiffness: 500
}

export const TILE_SIZES = [
  { height: 248, width: 227 },
  { height: 120, width: 110 },
  { height: 120, width: 110 },
  { height: 120, width: 110 },
  { height: 120, width: 110 },
  { height: 120, width: 110 }
]

export const getPosition = (order: number) => {
  'worklet'
  return {
    x: TILE_POSITIONS[order].x,
    y: TILE_POSITIONS[order].y
  }
}
export const getOrder = (x: number, y: number) => {
  'worklet'
  for (let i = 0; i < TILE_POSITIONS.length; i++) {
    const position = TILE_POSITIONS[i]
    const xInRange =
      x >= position.x - TILE_SIZES[i].width / 2 - 10 &&
      x <= position.x + TILE_SIZES[i].width / 2 + 10
    const yInRange =
      y >= position.y - TILE_SIZES[i].height / 2 - 10 &&
      y <= position.y + TILE_SIZES[i].height / 2 + 10
    if (xInRange && yInRange) {
      return i
    }
  }
  return -1 // Return -1 if the position is not found
}
