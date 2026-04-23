import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from 'remotion'
import { brand } from '../../brand'

interface Props {
  title: string
  location: string
  year: number
}

export const Outro: React.FC<Props> = ({ title, location, year }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const titleY = interpolate(frame, [0, 18], [30, 0], { extrapolateRight: 'clamp' })
  const titleOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' })
  const metaOpacity = interpolate(frame, [14, 28], [0, 1], { extrapolateRight: 'clamp' })
  const ctaOpacity = interpolate(frame, [28, 40], [0, 1], { extrapolateRight: 'clamp' })
  const ctaY = interpolate(frame, [28, 40], [10, 0], { extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill style={{ backgroundColor: brand.colors.background, justifyContent: 'center', alignItems: 'center', padding: 60 }}>
      <Img
        src={staticFile(brand.logo)}
        style={{ width: 360, height: 'auto', marginBottom: 32, opacity: metaOpacity }}
      />

      <div
        style={{
          fontFamily: brand.fonts.serif,
          fontSize: 88,
          fontWeight: 300,
          fontStyle: 'italic',
          color: brand.colors.foreground,
          textAlign: 'center',
          lineHeight: 1,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        {title}
      </div>

      <div style={{ width: 80, height: 1, backgroundColor: brand.colors.accent, marginTop: 32, marginBottom: 32, opacity: metaOpacity }} />

      <div style={{ fontFamily: brand.fonts.sans, fontSize: 22, letterSpacing: '0.2em', textTransform: 'uppercase', color: brand.colors.foreground, opacity: metaOpacity * 0.7 }}>
        {location} — {year}
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 120,
          fontFamily: brand.fonts.sans,
          fontSize: 20,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: brand.colors.foreground,
          opacity: ctaOpacity,
          transform: `translateY(${ctaY}px)`,
          borderBottom: `1px solid ${brand.colors.accent}`,
          paddingBottom: 6,
        }}
      >
        somazstudio.com
      </div>
    </AbsoluteFill>
  )
}
