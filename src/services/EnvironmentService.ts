const LOCAL_SERVICES_FRONTEND = 'https://portal.dev.demo.ftcpro.co'
const LOCAL_SERVICES_BACKEND = 'https://portal-backend.dev.demo.ftcpro.co'

export const getHostname = () => window.location.hostname

export const isLocal = () => getHostname() === 'localhost'

export const getApiBase = () =>
  isLocal()
    ? LOCAL_SERVICES_BACKEND
    : window.location.origin.replace('portal', 'portal-backend')

export const getAssetBase = () =>
  `${isLocal() ? LOCAL_SERVICES_FRONTEND : ''}/assets`

export const getCentralIdp = () => {
  const hostname = getHostname()
  if (hostname === 'portal.int.demo.ftcpro.co')
    return 'https://centralidp.demo.ftcpro.co/auth'
  if (hostname === 'portal-pen.dev.demo.ftcpro.co')
    return 'https://centralidp-pen.dev.demo.ftcpro.co/auth'
  if (hostname === 'portal.ftcpro.co')
    return 'https://centralidp.ftcpro.co/auth'
  return 'https://centralidp.dev.demo.ftcpro.co/auth'
}

const EnvironmentService = {
  isLocal,
  getHostname,
  getApiBase,
  getAssetBase,
  getCentralIdp,
}

export default EnvironmentService
