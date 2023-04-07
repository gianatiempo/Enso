import { Link, useNavigate, useParams } from 'react-router-dom'
import useContactById from '@/hooks/useContactById'
import useDeleteContact from '@/hooks/useDeleteContact'
import useUpdateContact from '@/hooks/useUpdateContact'

export function ContactPage() {
  const params = useParams<{ contactId: string }>()
  const navigate = useNavigate()
  const contactsQuery = useContactById(params.contactId)
  const deleteContact = useDeleteContact()
  const updateContact = useUpdateContact(params.contactId)

  if (contactsQuery.isLoading) {
    return <p>loading...</p>
  }

  return contactsQuery.isSuccess ? (
    <div id="contact">
      <div>
        <img key={contactsQuery.data.avatar} src={contactsQuery.data.avatar} alt="" />
      </div>

      <div>
        <h1>
          {contactsQuery.data.first || contactsQuery.data.last ? (
            <>
              {contactsQuery.data.first} {contactsQuery.data.last}
            </>
          ) : (
            <i>No Name</i>
          )}{' '}
          <button
            name="favorite"
            value={contactsQuery.data.favorite ? 'false' : 'true'}
            aria-label={contactsQuery.data.favorite ? 'Remove from favorites' : 'Add to favorites'}
            onClick={() => updateContact.mutate({ favorite: !contactsQuery.data.favorite })}
          >
            {contactsQuery.data.favorite ? '★' : '☆'}
          </button>
        </h1>

        {contactsQuery.data.twitter && (
          <p>
            <a target="_blank" href={`https://twitter.com/${contactsQuery.data.twitter}`} rel="noreferrer">
              {contactsQuery.data.twitter}
            </a>
          </p>
        )}

        {contactsQuery.data.notes && <p>{contactsQuery.data.notes}</p>}

        <div>
          <Link to={`/contacts/${params.contactId}/edit`}>Edit</Link>
          <button
            onClick={() => {
              deleteContact.mutate(params.contactId!, { onSuccess: () => navigate('/') })
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ) : null
}
