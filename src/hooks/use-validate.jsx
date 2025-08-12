import { useQuery } from "@tanstack/react-query"
import { get } from "../utils/fetch-client"

export const useValidate = (token) => {
  return useQuery({
    queryKey: ['validate', token],
    queryFn: async () => {
      const resp = await get(`/auth/validate`, token)
      return resp
    },
    enabled: !!token,
  })
}