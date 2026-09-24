import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const _leaderboardEndpoint = 'https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/'

function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('leaderboard').then(setLeaders).catch((reason) => setError(reason.message))
  }, [])

  return (
    <section>
      <div className="section-heading">
        <div><p className="eyebrow">Friendly competition</p><h1>Leaderboard</h1></div>
        <span className="count-pill">This season</span>
      </div>
      {error ? <div className="alert alert-warning">{error}</div> : null}
      <div className="leaderboard-list">
        {leaders.map((entry, index) => (
          <article className={`leader-row ${index === 0 ? 'leader-row-top' : ''}`} key={entry._id || entry.user?._id}>
            <span className="rank">{entry.rank || index + 1}</span>
            <div className="leader-avatar">{(entry.user?.displayName || entry.user?.username || '?').slice(0, 1)}</div>
            <div className="leader-name"><strong>{entry.user?.displayName || entry.user?.username || 'Unknown member'}</strong><small>OctoFit member</small></div>
            <strong className="leader-score">{entry.points} pts</strong>
          </article>
        ))}
        {!leaders.length && !error ? <p className="empty-state">No leaderboard entries yet.</p> : null}
      </div>
    </section>
  )
}

export default Leaderboard
