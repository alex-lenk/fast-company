import httpService from './http.service'

const qualityEndpoint = 'qualities/'

const qualityService = {
  fetchAll: async () => {
    const {data} = await httpService.get(qualityEndpoint)
    return data
  }
}
export default qualityService
