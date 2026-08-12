import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageCard from '../components/PageCard'
import { useStudy } from '../context/StudyContext'
import { submitStudy } from '../services/studyService'

export default function DebriefPage() {
  const n = useNavigate()
  const { studyData, updateStudyData } = useStudy()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)

  const done = async () => {
    setSubmitting(true)
    setError(false)
    const completedAt = new Date().toISOString()
    const finalData = { ...studyData, completedAt }
    const result = await submitStudy(finalData)
    if (result.success) {
      updateStudyData({ completedAt })
      n('/complete')
    } else {
      setError(true)
      setSubmitting(false)
    }
  }

  return (
    <PageCard title='Debrief'>
      <div className='content-stack'>
        <p>Thank you for completing the study. Some AI recommendations were intentionally designed to be correct, incorrect or partially correct.</p>
        <p>This was necessary to examine whether participants independently evaluate AI advice or accept it without sufficient verification.</p>
        <p>The AI recommendations were predefined and were not generated live.</p>
        <p>This task was not designed to judge your intelligence, and your performance should not be interpreted as a personal ability score.</p>
        <p>Your responses are anonymous and are used only for this research.</p>
      </div>
      {error && (
        <div className='warning-box'>
          Something went wrong while saving your responses. Please check your connection and try again.
        </div>
      )}
      <div className='actions'>
        <button className='button primary' disabled={submitting} onClick={done}>
          {submitting ? 'Submitting…' : 'Submit responses'}
        </button>
      </div>
    </PageCard>
  )
}
