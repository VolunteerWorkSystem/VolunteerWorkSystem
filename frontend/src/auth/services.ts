interface JwtToken {
  exp?: number
}

export type Profile = JwtToken & {
  name?: string
  picture?: string

  active: boolean
  connections?: any
  count: any
  create_time: Array<string>
  email?: string | undefined | null
  picture_url: string
  id: string
  phone?: string | undefined | null
  custos_phone: string
  rank: number
  role: string
  state: number
  status: string
  update_time: Array<string>
  username: string
  verified: number
  terms_agreed: boolean
}

export function isVerified(profile: Profile) {
  return Boolean(profile?.email && profile?.phone)
}
