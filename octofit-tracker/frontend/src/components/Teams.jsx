import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('teams').then(setTeams).catch((reason) => setError(reason.message))
  }, [])

  return (
    <section>
      <div className="section-heading"><div><p className="eyebrow">Train together</p><h1>Teams</h1></div><span className="count-pill">{teams.length} teams</span></div>
      {error ? <div className="alert alert-warning">{error}</div> : null}
      <div className="row g-3">
        {teams.map((team) => (
          <div className="col-md-6" key={team._id}>
            <article className="team-card"><div className="team-mark">{team.name.slice(0, 1)}</div><div><h2>{team.name}</h2><p>{team.members?.length || 0} members</p></div><span className="arrow">&rarr;</span></article>
          </div>
        ))}
      </div>
      {!teams.length && !error ? <p className="empty-state">No teams created yet.</p> : null}
    </section>
  )
}

export default Teams
