import { useQuery } from '@tanstack/react-query'
import { authService } from '@/services/auth.service'

export function useAuth() {
  const { data: user, isLoading } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => authService.me().then((res) => res.data),
    retry: false,
  })

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  }
}
