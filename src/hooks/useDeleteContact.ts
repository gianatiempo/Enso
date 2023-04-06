import { useMutation, useQueryClient } from '@tanstack/react-query'

const useDeleteContact = () => {
  const queryClient = useQueryClient()

  return useMutation((id: string) => fetch(`/api/contact/${id}`, { method: 'DELETE' }), {
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['contacts'] }),
  })
}
export default useDeleteContact
