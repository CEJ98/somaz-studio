import { Img, interpolate, useCurrentFrame, useVideoConfig } from 'remotion'

interface Props {
  src: string
  direction?: 'in' | 'out' | 'left' | 'right'
}

export const KenBurnsImage: React.FC<Props> = ({ src, direction = 'in' }) => {
  const frame = useCurrentFrame()
  const { durationInFrames } = useVideoConfig()
  const progress = frame / durationInFrames

  const scale = direction === 'in'
    ? interpolate(progress, [0, 1], [1.0, 1.12])
    : direction === 'out'
      ? interpolate(progress, [0, 1], [1.12, 1.0])
      : 1.08

  const translateX = direction === 'left'
    ? interpolate(progress, [0, 1], [4, -4])
    : direction === 'right'
      ? interpolate(progress, [0, 1], [-4, 4])
      : 0

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'absolute', inset: 0 }}>
      <Img
        src={src}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `scale(${scale}) translateX(${translateX}%)`,
          transformOrigin: 'center center',
        }}
      />
    </div>
  )
}
