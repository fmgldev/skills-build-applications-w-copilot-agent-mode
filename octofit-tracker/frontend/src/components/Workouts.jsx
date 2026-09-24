import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const _workoutsEndpoint = 'https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('workouts').then(setWorkouts).catch((reason) => setError(reason.message))
  }, [])

  return (
    <section>
      <div className="section-heading"><div><p className="eyebrow">Your next session</p><h1>Workouts</h1></div><span className="count-pill">{workouts.length} plans</span></div>
      {error ? <div className="alert alert-warning">{error}</div> : null}
      <div className="row g-3">
        {workouts.map((workout) => <div className="col-lg-4" key={workout._id}><article className="workout-card"><div className="workout-icon">+</div><span className="level-tag">{workout.fitnessLevel}</span><h2>{workout.title}</h2><p>{workout.description}</p><footer><span>{workout.durationMinutes} min</span><span className="text-capitalize">{workout.activityType}</span></footer></article></div>)}
      </div>
      {!workouts.length && !error ? <p className="empty-state">No workouts available yet.</p> : null}
    </section>
  )
}

export default Workouts
