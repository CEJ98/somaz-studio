import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion'
import { brand } from '../../brand'
import { KenBurnsImage } from './KenBurnsImage'

interface Props {
  src: string
  caption?: string
  index: number
  total: number
  direction?: 'in' | 'out' | 'left' | 'right'
}

export const ImageSlide: React.FC<Props> = ({ src, caption, index, total, direction = 'in' }) => {
  const frame = useCurrentFrame()
  const { durationInFrames } = useVideoConfig()

  const fadeIn = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' })
  const fadeOut = interpolate(frame, [durationInFrames - 10, durationInFrames], [1, 0], { extrapolateLeft: 'clamp' })
  const opacity = Math.min(fadeIn, fadeOut)

  return (
    <AbsoluteFill style={{ opacity, backgroundColor: brand.colors.background }}>
      <KenBurnsImage src={src} direction={direction} />

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,26,26,0.5) 0%, rgba(26,26,26,0) 40%)' }} />

      <div style={{ position: 'absolute', top: 60, left: 60, right: 60, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: brand.fonts.sans, fontSize: 18, letterSpacing: '0.3em', textTransform: 'uppercase', color: brand.colors.background, opacity: 0.85 }}>
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>

      {caption && (
        <div style={{ position: 'absolute', bottom: 80, left: 60, right: 60 }}>
          <div style={{ fontFamily: brand.fonts.sans, fontSize: 16, letterSpacing: '0.3em', textTransform: 'uppercase', color: brand.colors.background, opacity: 0.7, marginBottom: 8 }}>
            {caption}
          </div>
        </div>
      )}
    </AbsoluteFill>
  )
}
