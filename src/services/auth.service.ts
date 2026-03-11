import { api } from '@/lib/axios'

export interface LoginPayload {
  email: string
  password: string
}

export interface AuthUser {
  id: number
  name: string
  email: string
}

export const authService = {
  login: (payload: LoginPayload) =>
    api.post<AuthUser>('/auth/login', payload),

  logout: () =>
    api.post('/auth/logout'),

  me: () =>
    api.get<AuthUser>('/auth/me'),
}
