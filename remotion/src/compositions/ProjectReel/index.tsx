import { AbsoluteFill, Sequence, useVideoConfig } from 'remotion'
import { ReelProject } from '../../data'
import { Intro } from './Intro'
import { ImageSlide } from './ImageSlide'
import { Outro } from './Outro'

interface Props {
  project: ReelProject
}

const INTRO_DURATION = 30
const SLIDE_DURATION = 90
const OUTRO_DURATION = 75

export const ProjectReel: React.FC<Props> = ({ project }) => {
  const { fps } = useVideoConfig()
  const directions: ('in' | 'out' | 'left' | 'right')[] = ['in', 'left', 'out']

  return (
    <AbsoluteFill style={{ backgroundColor: '#F8F6F2' }}>
      <Sequence durationInFrames={INTRO_DURATION}>
        <Intro category={project.category} />
      </Sequence>

      {project.images.map((src, i) => (
        <Sequence key={src} from={INTRO_DURATION + i * SLIDE_DURATION} durationInFrames={SLIDE_DURATION}>
          <ImageSlide
            src={src}
            caption={i === 0 ? project.location : undefined}
            index={i}
            total={project.images.length}
            direction={directions[i % directions.length]}
          />
        </Sequence>
      ))}

      <Sequence from={INTRO_DURATION + project.images.length * SLIDE_DURATION} durationInFrames={OUTRO_DURATION}>
        <Outro title={project.title} location={project.location} year={project.year} />
      </Sequence>
    </AbsoluteFill>
  )
}

export const getProjectReelDuration = (imagesCount: number): number => {
  return INTRO_DURATION + imagesCount * SLIDE_DURATION + OUTRO_DURATION
}
