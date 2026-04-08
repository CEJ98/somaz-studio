import nextConfig from 'eslint-config-next'

const config = [
  { ignores: ['.next/**', 'node_modules/**', '.claude/**', 'scripts/**', 'public/**'] },
  ...nextConfig,
]

export default config
