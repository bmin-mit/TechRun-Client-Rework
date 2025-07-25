import Cookies from 'js-cookie'
import { requests } from './requests'

interface LoginReqDto {
  username: string
  password: string
}

function saveAccessToken(accessToken: string) {
  Cookies.set('accessToken', accessToken)
  requests.defaults.headers.common.Authorization = `Bearer ${accessToken}`
}

export async function login(data: LoginReqDto) {
  try {
    await requests
      .post('/auth/sign-in', data)
      .then((res) => {
        saveAccessToken(res.data.accessToken)
      })
  }
  catch {
    return false
  }
  return true
}

interface MyTeamResDto {
  name: string
  username: string
  coins: number
  unlockedPuzzles: string[]
  skillCards: string[]
}

export async function middlewareCheck(accessToken?: string): Promise<MyTeamResDto> {
  return requests.get('/team/my-team', { headers: { Authorization: `Bearer ${accessToken}` } }).then(res => res.data)
}

export async function pinAuth(pin: string, stationCodename: string) {
  return requests.post('/station/auth', { pin, stationCodename }).then(res => res.data)
}
