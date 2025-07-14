import { useQuery } from "@tanstack/react-query"
import { useAuthContext } from "./use-auth-context"
import { get } from "../utils/fetch-client"

export const useItems = () => {
  const { token } = useAuthContext()
  
  return useQuery({
    queryKey: ['items'],
    queryFn: async () => {
      const resp = await get(`/item`, token)
      if (!resp) {
        throw new Error("Error retrieving items")
      }
      return resp
  },
  })
}