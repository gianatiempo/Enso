import { useQuery } from '@tanstack/react-query'
import { ContactType } from '@/types'

const useContactById = (id?: string) => {
  return useQuery<ContactType, Error>(['contacts', id], async () => {
    const contact = await fetch(`/api/contact/${id}`).then(r => r.json())
    if (!contact) {
      throw new Error('Not Found')
    }
    return contact
  })
}

export default useContactById
