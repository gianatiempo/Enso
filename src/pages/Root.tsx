import { CSSProperties, useState } from 'react'
import { Button, Input, Layout, theme, Typography } from 'antd'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import enso from '@/assets/enso.png'
import useContacts from '@/hooks/useContacts'
import useCreateContact from '@/hooks/useCreateContact'

const { Header, Content, Footer, Sider } = Layout
const siderStyle: CSSProperties = { overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }
const logoStyle: CSSProperties = {
  height: 32,
  margin: 16,
  background: '#fff',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  justifyContent: 'space-evenly',
}
const searchStyle: CSSProperties = { display: 'flex', padding: '8px 4px' }

export default function Root() {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const [q, setQ] = useState<string>('')
  const contactsQuery = useContacts(q)
  const createContact = useCreateContact()
  const navigate = useNavigate()

  const isLoading = contactsQuery.isLoading && q.length > 0

  return (
    <>
      <Layout>
        <Sider theme="light" style={siderStyle}>
          <div style={logoStyle} onClick={() => navigate('/')}>
            <img src={enso} alt="Logo" height={32} />
            <Typography.Title level={3} type={'success'}>
              Starter
            </Typography.Title>
          </div>
          <div style={searchStyle}>
            <Input
              id="q"
              value={q}
              onChange={e => setQ(e.target.value)}
              className={isLoading ? 'loading' : ''}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />

            <Button
              type="primary"
              onClick={() =>
                createContact.mutate(undefined, { onSuccess: contact => navigate(`/contacts/${contact.id}/edit`) })
              }
            >
              New
            </Button>
          </div>

          <nav>
            {contactsQuery.isSuccess && contactsQuery.data.length ? (
              <ul>
                {contactsQuery.data.map(contact => (
                  <li key={contact.id}>
                    <NavLink
                      to={`contacts/${contact.id}`}
                      className={({ isActive, isPending }) => (isActive ? 'active' : isPending ? 'pending' : '')}
                    >
                      {contact.first || contact.last ? (
                        <>
                          {contact.first} {contact.last}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}{' '}
                      {contact.favorite && <span>★</span>}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No contacts</i>
              </p>
            )}
          </nav>
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: '24px 16px 0', overflow: 'initial', height: 'calc(100% - 133px)' }}>
            <div style={{ padding: 24, textAlign: 'center', background: colorBgContainer, height: '100%' }}>
              <Outlet />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Enso ©2023 Created by Ariel Gianatiempo</Footer>
        </Layout>
      </Layout>
    </>
  )
}
