import { useMutation, useQueryClient } from '@tanstack/react-query'

const useCreateContact = () => {
  const queryClient = useQueryClient()

  return useMutation(
    () => {
      const contact = fetch('/api/contact', { method: 'POST' }).then(r => r.json())
      return contact
    },
    { onSuccess: () => queryClient.invalidateQueries({ queryKey: ['contacts'] }) },
  )
}
export default useCreateContact
