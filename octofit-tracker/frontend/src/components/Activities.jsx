import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const _activitiesEndpoint = 'https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('activities').then(setActivities).catch((reason) => setError(reason.message))
  }, [])

  return (
    <section>
      <div className="section-heading">
        <div>
          <p className="eyebrow">Movement log</p>
          <h1>Recent activities</h1>
        </div>
        <span className="count-pill">{activities.length} logged</span>
      </div>
      {error ? <div className="alert alert-warning">{error}</div> : null}
      <div className="table-shell">
        <table className="table align-middle mb-0">
          <thead><tr><th>Member</th><th>Activity</th><th>Duration</th><th>Points</th></tr></thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id}>
                <td><strong>{activity.user?.displayName || activity.user?.username || 'Unknown member'}</strong></td>
                <td className="text-capitalize">{activity.type}</td>
                <td>{activity.durationMinutes} min</td>
                <td><span className="points">+{activity.points}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        {!activities.length && !error ? <p className="empty-state">No activities logged yet.</p> : null}
      </div>
    </section>
  )
}

export default Activities
