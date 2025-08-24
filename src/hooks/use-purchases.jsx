import { useQuery } from "@tanstack/react-query"
import { useAuthContext } from "./use-auth-context"
import { get } from "../utils/fetch-client"

export const usePurchases = () => {
  const { token } = useAuthContext()
  
  return useQuery({
    
    queryKey: ['purchases'],
    
    queryFn: async () => {
      const resp = await get(`/purchase`, token)
      if (!resp) {
        throw new Error("Error retrieving purchases")
      }
      return resp
    },
  })
}