import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { brand } from '../../brand'

interface Props {
  category: string
}

export const Intro: React.FC<Props> = ({ category }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const lineWidth = spring({ frame, fps, config: { damping: 20 }, durationInFrames: 30 }) * 100
  const textOpacity = interpolate(frame, [10, 25], [0, 1], { extrapolateRight: 'clamp' })
  const textY = interpolate(frame, [10, 25], [15, 0], { extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill style={{ backgroundColor: brand.colors.background, justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '60%', height: 1, backgroundColor: brand.colors.accent, marginBottom: 40, transform: `scaleX(${lineWidth / 100})`, transformOrigin: 'left' }} />
      <div
        style={{
          fontFamily: brand.fonts.sans,
          fontSize: 22,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: brand.colors.accent,
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
        }}
      >
        {category}
      </div>
      <div style={{ width: '60%', height: 1, backgroundColor: brand.colors.accent, marginTop: 40, transform: `scaleX(${lineWidth / 100})`, transformOrigin: 'right' }} />
    </AbsoluteFill>
  )
}
