import { useQuery } from "@tanstack/react-query"
import { useAuthContext } from "./use-auth-context"
import { get } from "../utils/fetch-client"

export const useUser = () => {
  const { token, userId } = useAuthContext()
  
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const resp = await get(`/user/${userId}`, token)
      if (!resp) {
        throw new Error('User not found')
      }
      return resp
    },
    enabled: !!token && !!userId, // Only run if token and userId are available
  })
}