import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import useContactById from '@/hooks/useContactById'
import useForm from '@/hooks/useForm'
import useUpdateContact from '@/hooks/useUpdateContact'
import { ContactType } from '@/types'

export function EditContactPage() {
  const params = useParams<{ contactId: string }>()
  const contactsQuery = useContactById(params.contactId)
  const updateContact = useUpdateContact(params.contactId)
  const form = useForm({} as ContactType)

  const navigate = useNavigate()

  useEffect(() => {
    if (contactsQuery.data) {
      form.setInitialValues(contactsQuery.data)
    }
  }, [contactsQuery.data])

  if (contactsQuery.isLoading) {
    return <p>loading...</p>
  }

  return contactsQuery.isSuccess ? (
    <form
      method="post"
      id="contact-form"
      onSubmit={e => {
        e.preventDefault()
        updateContact.mutate(form.currentValues, {
          onSuccess: () => navigate(`/contacts/${params.contactId}`),
        })
      }}
    >
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          id="first"
          name="first"
          value={form.currentValues.first}
          onChange={e => form.setValue('first', e.target.value)}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          id="last"
          name="last"
          value={form.currentValues.last}
          onChange={e => form.setValue('last', e.target.value)}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          placeholder="@jack"
          id="twitter"
          name="twitter"
          value={form.currentValues.twitter}
          onChange={e => form.setValue('twitter', e.target.value)}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          id="avatar"
          name="avatar"
          value={form.currentValues.avatar}
          onChange={e => form.setValue('avatar', e.target.value)}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          rows={6}
          id="notes"
          name="notes"
          value={form.currentValues.notes}
          onChange={e => form.setValue('notes', e.target.value)}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={() => {
            navigate(-1)
          }}
        >
          Cancel
        </button>
      </p>
    </form>
  ) : null
}
