import React, { useState, useEffect } from 'react'

interface Meeting {
  id: number
  title: string
  starts_at: string
  ends_at: string
  attendee_count: number
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function App() {
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [title, setTitle] = useState('')
  const [startsAt, setStartsAt] = useState('')
  const [endsAt, setEndsAt] = useState('')
  const [attendeeCount, setAttendeeCount] = useState(1)

  const fetchMeetings = async () => {
    try {
      const res = await fetch(`${API_URL}/api/meetings`)
      if (res.ok) {
        const data = await res.json()
        setMeetings(data)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchMeetings()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch(`${API_URL}/api/meetings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          starts_at: new Date(startsAt).toISOString(),
          ends_at: new Date(endsAt).toISOString(),
          attendee_count: Number(attendeeCount)
        })
      })
      if (res.ok) {
        setTitle('')
        setStartsAt('')
        setEndsAt('')
        setAttendeeCount(1)
        fetchMeetings()
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <h1 style={{ marginTop: 0 }}>Spry Meetings</h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, marginBottom: 30, background: '#f1f5f9', padding: 16, borderRadius: 6 }}>
        <h3>Schedule Meeting</h3>
        <input 
          placeholder="Title" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          required 
          style={{ padding: 8 }} 
        />
        <label>Starts At:
          <input 
            type="datetime-local" 
            value={startsAt} 
            onChange={e => setStartsAt(e.target.value)} 
            required 
            style={{ width: '100%', padding: 8, marginTop: 4 }} 
          />
        </label>
        <label>Ends At:
          <input 
            type="datetime-local" 
            value={endsAt} 
            onChange={e => setEndsAt(e.target.value)} 
            required 
            style={{ width: '100%', padding: 8, marginTop: 4 }} 
          />
        </label>
        <label>Attendees:
          <input 
            type="number" 
            min="1" 
            value={attendeeCount} 
            onChange={e => setAttendeeCount(Number(e.target.value))} 
            required 
            style={{ width: '100%', padding: 8, marginTop: 4 }} 
          />
        </label>
        <button type="submit" style={{ padding: 10, background: '#0284c7', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
          Create Meeting
        </button>
      </form>

      <h2>Scheduled Meetings</h2>
      {meetings.length === 0 ? <p>No meetings found.</p> : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {meetings.map(m => (
            <li key={m.id} style={{ borderBottom: '1px solid #e2e8f0', padding: '12px 0' }}>
              <strong>{m.title}</strong> — {m.attendee_count} attendees<br/>
              <small style={{ color: '#64748b' }}>
                {new Date(m.starts_at).toLocaleString()} - {new Date(m.ends_at).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
