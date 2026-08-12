import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ConfidenceScale from '../components/ConfidenceScale'
import PageCard from '../components/PageCard'
import ProgressBar from '../components/ProgressBar'
import { useStudy } from '../context/StudyContext'
import { tasks } from '../data/tasks'
import { calculateConfidenceShift } from '../utils/formatters'

const OPTION_LETTERS = ['A', 'B', 'C', 'D']

// Wrapper keyed by taskIndex so the inner component fully remounts (and
// therefore resets all local state) every time the participant moves to
// a different task, instead of reusing the same instance across route
// param changes.
export default function TaskPage() {
  const { taskIndex } = useParams()
  const { studyData } = useStudy()

  // taskOrder is assigned asynchronously right when the app loads (see
  // StudyContext), so there's a brief window before it's ready. In
  // practice the participant has already clicked through several earlier
  // pages by the time they reach a task, so this is rarely visible.
  if (!studyData.taskOrder) {
    return <PageCard title='Loading…'><p>Setting up your session, one moment.</p></PageCard>
  }

  return <TaskPageInner key={taskIndex} />
}

function TaskPageInner() {
  const n = useNavigate()
  const { taskIndex } = useParams()
  const i = Number(taskIndex)
  const { studyData, saveTaskResponse } = useStudy()

  const taskId = studyData.taskOrder[i]
  const task = tasks.find(t => t.id === taskId)

  const [stage, setStage] = useState('initial')
  const [startedAt] = useState(Date.now())
  const [initialAnswer, setInitialAnswer] = useState('')
  const [initialConfidence, setInitialConfidence] = useState('')
  const [explanationViewed, setExplanationViewed] = useState(false)
  const [finalAnswer, setFinalAnswer] = useState('')
  const [finalConfidence, setFinalConfidence] = useState('')
  const [justification, setJustification] = useState('')

  useEffect(() => {
    if (!task) n('/final-questionnaire', { replace: true })
  }, [task, n])

  const changed = useMemo(
    () => initialAnswer !== '' && finalAnswer !== '' && initialAnswer !== finalAnswer,
    [initialAnswer, finalAnswer]
  )

  if (!task) return null

  const aiCondition = studyData.conditionAssignments?.[task.id]
  const aiData = task.aiRecommendations[aiCondition]

  const submit = () => {
    saveTaskResponse(task.id, {
      taskId: task.id,
      category: task.category,
      difficulty: task.difficulty,
      taskOrder: i + 1,
      aiCondition,
      initialAnswer: Number(initialAnswer),
      correctAnswer: task.correctOption,
      initialCorrect: Number(initialAnswer) === task.correctOption,
      initialConfidence: Number(initialConfidence),
      explanationViewed,
      finalAnswer: Number(finalAnswer),
      finalCorrect: Number(finalAnswer) === task.correctOption,
      finalConfidence: Number(finalConfidence),
      answerChanged: changed,
      confidenceShift: calculateConfidenceShift(initialConfidence, finalConfidence),
      justification: justification.trim(),
      timeSpent: Math.round((Date.now() - startedAt) / 1000)
    })
    n(i + 1 < tasks.length ? `/tasks/${i + 1}` : '/final-questionnaire')
  }

  return (
    <>
      <ProgressBar current={i + 1} total={tasks.length} label={`Task ${i + 1} of ${tasks.length}`} />
      <PageCard title={task.category} intro={task.scenario}>
        <h3>{task.question}</h3>
        {stage === 'initial' ? (
          <>
            <div className='option-list'>
              {task.options.map((o, idx) => (
                <label key={o} className='answer-option'>
                  <input
                    type='radio'
                    name='initialAnswer'
                    value={idx}
                    checked={initialAnswer === String(idx)}
                    onChange={e => setInitialAnswer(e.target.value)}
                  />
                  <span className='option-letter'>{OPTION_LETTERS[idx]}</span>
                  <span>{o}</span>
                </label>
              ))}
            </div>
            <ConfidenceScale
              name='initialConfidence'
              value={initialConfidence}
              onChange={setInitialConfidence}
              label='How confident are you in your initial answer?'
            />
            <div className='actions'>
              <button
                className='button primary'
                disabled={initialAnswer === '' || initialConfidence === ''}
                onClick={() => setStage('ai')}
              >
                Lock initial answer and view AI recommendation
              </button>
            </div>
          </>
        ) : (
          <>
            <div className='info-box'>
              <p className='eyebrow'>Your initial answer</p>
              <p>
                <span className='option-letter'>{OPTION_LETTERS[Number(initialAnswer)]}</span>{' '}
                {task.options[Number(initialAnswer)]}
              </p>
            </div>
            <div className='ai-card'>
              <p className='eyebrow'>Predefined AI recommendation</p>
              <p>{aiData.recommendation}</p>
              <button className='text-button' onClick={() => setExplanationViewed(true)}>
                View AI explanation
              </button>
              {explanationViewed && <div className='ai-explanation'>{aiData.explanation}</div>}
            </div>

            <h3>Your final answer</h3>
            <div className='option-list'>
              {task.options.map((o, idx) => (
                <label key={o} className='answer-option'>
                  <input
                    type='radio'
                    name='finalAnswer'
                    value={idx}
                    checked={finalAnswer === String(idx)}
                    onChange={e => setFinalAnswer(e.target.value)}
                  />
                  <span className='option-letter'>{OPTION_LETTERS[idx]}</span>
                  <span>{o}</span>
                </label>
              ))}
            </div>
            <ConfidenceScale
              name='finalConfidence'
              value={finalConfidence}
              onChange={setFinalConfidence}
              label='How confident are you in your final answer?'
            />
            <label className='field-group'>
              Briefly explain why you kept or changed your answer
              <textarea
                rows='5'
                value={justification}
                onChange={e => setJustification(e.target.value)}
                placeholder='Briefly explain your reasoning.'
              />
              <span className='helper-text'>{justification.trim().length}/8 minimum characters</span>
            </label>
            <div className='actions'>
              <button
                className='button primary'
                disabled={finalAnswer === '' || finalConfidence === '' || justification.trim().length < 8}
                onClick={submit}
              >
                Submit task
              </button>
            </div>
          </>
        )}
      </PageCard>
    </>
  )
}