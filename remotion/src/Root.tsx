import { Composition } from 'remotion'
import { ProjectReel, getProjectReelDuration } from './compositions/ProjectReel'
import { projects, getProject } from './data'

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {projects.map((project) => (
        <Composition
          key={`reel-9-16-${project.slug}`}
          id={`ProjectReel-${project.slug}`}
          component={ProjectReel}
          durationInFrames={getProjectReelDuration(project.images.length)}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{ project }}
        />
      ))}

      <Composition
        id="ProjectReel"
        component={ProjectReel}
        durationInFrames={getProjectReelDuration(3)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ project: getProject('casa-m') }}
      />

      {projects.map((project) => (
        <Composition
          key={`reel-1-1-${project.slug}`}
          id={`ProjectReel-Square-${project.slug}`}
          component={ProjectReel}
          durationInFrames={getProjectReelDuration(project.images.length)}
          fps={30}
          width={1080}
          height={1080}
          defaultProps={{ project }}
        />
      ))}
    </>
  )
}
