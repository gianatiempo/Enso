import { matchSorter } from 'match-sorter'
import { DefaultBodyType, PathParams, rest } from 'msw'
import sortBy from 'sort-by'
import type { ContactType } from '@/types'

let contacts: ContactType[] = [
  {
    avatar: 'https://www.w3schools.com/w3images/avatar4.png',
    createdAt: 1680562398167,
    first: 'Mick',
    id: 'xbsg83z',
    last: 'Rofono',
    notes: 'Hear me Out!',
    twitter: '@TheMic',
  },
  {
    avatar: 'https://www.w3schools.com/w3images/avatar5.png',
    createdAt: 1680562318165,
    favorite: true,
    first: 'Roque',
    id: '0p7r86s',
    last: 'Perez',
    notes: 'Mr. Magoo',
    twitter: '@Rock',
  },
]

// let me = null

export const handlers = [
  //contact endpoints
  ...[
    rest.post<DefaultBodyType, PathParams<string>, ContactType>('/api/contact', (req, res, ctx) => {
      const id = Math.random().toString(36).substring(2, 9)
      const newContact = { id, createdAt: Date.now() } as ContactType
      contacts.unshift(newContact)

      return res(ctx.delay(), ctx.status(200), ctx.json(newContact))
    }), //CREATE

    rest.get<DefaultBodyType, PathParams<string>, ContactType[]>('/api/contact', (req, res, ctx) => {
      const q = req.url.searchParams.get('q')

      const resp = q ? matchSorter(contacts, q, { keys: ['first', 'last'] }) : contacts
      return res(ctx.delay(), ctx.status(200), ctx.json(resp.sort(sortBy('last', 'createdAt'))))
    }), //READ ALL

    rest.get<DefaultBodyType, PathParams<string>, ContactType>('/api/contact/:contactId', (req, res, ctx) => {
      const { contactId } = req.params
      const contact = contacts.find(c => c.id === contactId) as ContactType
      return res(ctx.delay(), ctx.status(200), ctx.json(contact))
    }), //READ

    rest.patch<DefaultBodyType, PathParams<string>, ContactType>('/api/contact/:contactId', async (req, res, ctx) => {
      const { contactId } = req.params
      const update = await req.json()
      contacts = contacts.map(c => (c.id !== contactId ? c : { ...c, ...update }))
      const contact = contacts.find(c => c.id === contactId) as ContactType

      return res(ctx.delay(), ctx.status(200), ctx.json(contact))
    }), //UPDATE

    rest.delete<DefaultBodyType, PathParams<string>, ContactType>('/api/contact/:contactId', (req, res, ctx) => {
      const { contactId } = req.params

      contacts = contacts.filter(c => c.id !== contactId)
      return res(ctx.delay(), ctx.status(200))
    }), //DELETE
  ],
  //user endpoints
  // ...[
  //   rest.post('/user/login', (req, res, ctx) => {
  //     const { username, password } = req.body

  //     const user = users.find(u => u.username === username)

  //     if (user && user.password === password) {
  //       me = user
  //       return res(ctx.delay(), ctx.status(200), ctx.json(user))
  //     }
  //     return res(ctx.delay(), ctx.status(403), ctx.json({ message: 'Failed to authenticate!' }))
  //   }),

  //   rest.post('/user/logout', (req, res, ctx) => {
  //     return res(ctx.delay(), ctx.status(200), ctx.json({ message: 'Successfully logged out!' }))
  //   }),

  //   rest.post('/user/register', (req, res, ctx) => {
  //     const { username, password, confirm } = req.body

  //     if (username && password === confirm) {
  //       const newUser = { name: username, role: ROLE.USER, id: uuidv4(), username, password }
  //       me = newUser
  //       users.push(newUser)
  //       return res(ctx.delay(), ctx.status(200), ctx.json(newUser))
  //     }
  //     return res(ctx.delay(), ctx.status(403), ctx.json({ message: 'Failed to authenticate!' }))
  //   }),

  //   rest.get('/user/me', (req, res, ctx) => {
  //     const isLoggedIn = me !== null

  //     return !isLoggedIn
  //       ? res(ctx.delay(), ctx.status(403), ctx.json({ message: 'Not authorized' }))
  //       : res(ctx.delay(), ctx.status(200), ctx.json(me))
  //   }),

  //   rest.post('/user', (req, res, ctx) => {
  //     const data = req.body
  //     const newUser = { ...data, id: uuidv4(), role: ROLE[data.role.toUpperCase()] }
  //     users.push(newUser)
  //     return res(ctx.delay(), ctx.status(200), ctx.json(newUser))
  //   }), //CREATE

  //   rest.get('/user', (req, res, ctx) => {
  //     return res(ctx.delay(), ctx.status(200), ctx.json(users))
  //   }), //READ

  //   rest.patch('/user/:userId', (req, res, ctx) => {
  //     const { userId } = req.params
  //     users = users.map(u =>
  //       u.id !== userId
  //         ? u
  //         : { ...u, ...req.body, role: req.body.role ? ROLE[req.body.role.toUpperCase()] : u.role },
  //     )
  //     return res(ctx.delay(), ctx.status(200), ctx.json(bikes))
  //   }), //UPDATE

  //   rest.delete('/user/:userId', (req, res, ctx) => {
  //     const { userId } = req.params

  //     users = users.filter(b => b.id !== userId)
  //     return res(ctx.delay(), ctx.status(200), ctx.json(users))
  //   }), //DELETE
  // ],
]
