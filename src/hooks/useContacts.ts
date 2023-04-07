import { useQuery } from '@tanstack/react-query'
import { ContactType } from '@/types'

const useContacts = (q: string) => {
  return useQuery<ContactType[], Error>(['contacts', q], async () => {
    const contacts = await fetch(`/api/contact${q ? `?q=${q}` : ``}`).then(r => r.json())
    return contacts
  })
}

export default useContacts
