import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ContactType } from '@/types'

const useUpdateContact = (id?: string) => {
  const queryClient = useQueryClient()

  return useMutation(
    (update: Partial<ContactType>) => {
      const updatedContact = fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(update),
      }).then(r => r.json())
      return updatedContact
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['contacts'] })
      },
    },
  )
}

export default useUpdateContact
