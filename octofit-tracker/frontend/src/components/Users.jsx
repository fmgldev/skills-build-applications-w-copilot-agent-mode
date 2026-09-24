import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const _usersEndpoint = 'https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('users').then(setUsers).catch((reason) => setError(reason.message))
  }, [])

  return (
    <section>
      <div className="section-heading"><div><p className="eyebrow">Community roster</p><h1>Members</h1></div><span className="count-pill">{users.length} active</span></div>
      {error ? <div className="alert alert-warning">{error}</div> : null}
      <div className="member-grid">
        {users.map((user) => <article className="member-card" key={user._id}><div className="member-avatar">{user.displayName?.slice(0, 1)}</div><h2>{user.displayName}</h2><p>@{user.username}</p><span className="level-tag">{user.fitnessLevel}</span></article>)}
      </div>
      {!users.length && !error ? <p className="empty-state">No members registered yet.</p> : null}
    </section>
  )
}

export default Users
