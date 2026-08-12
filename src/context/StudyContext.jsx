import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { tasks } from '../data/tasks'
import { getNextPatternIndex } from '../services/participantAssignment'

const C = createContext(null)

const CONDITIONS = ['correct', 'incorrect', 'partial']

// Cyclic-shift rotation: pattern 0 assigns condition[i] to task i,
// pattern 1 shifts every task's condition by one, pattern 2 by two.
// Across any 3 consecutive participants (patterns 0, 1, 2), every task
// gets each of the 3 conditions exactly once — this is what keeps AI
// condition balanced per task at the sample level, not just per
// participant.
function buildConditionAssignments(patternIndex) {
  const assignments = {}
  tasks.forEach((task, i) => {
    assignments[task.id] = CONDITIONS[(i + patternIndex) % CONDITIONS.length]
  })
  return assignments
}

function shuffledTaskOrder() {
  const ids = tasks.map(t => t.id)
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[ids[i], ids[j]] = [ids[j], ids[i]]
  }
  return ids
}

const buildInitialState = () => ({
  participantId: crypto.randomUUID(),
  consent: false,
  demographics: { ageGroup: '', educationLevel: '', aiUseFrequency: '', selfRatedAiLiteracy: '' },
  // Both filled in asynchronously right after the app loads (see the
  // effect below) — null until the rotation counter round-trip resolves.
  conditionAssignments: null,
  taskOrder: null,
  taskResponses: {},
  finalQuestionnaire: { trustInAi: '', aiDependence: '', comments: '' },
  startedAt: new Date().toISOString(),
  completedAt: null
})

export function StudyProvider({ children }) {
  const [studyData, setStudyData] = useState(buildInitialState)
  const [assignmentReady, setAssignmentReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    getNextPatternIndex(CONDITIONS.length).then(patternIndex => {
      if (cancelled) return
      setStudyData(c => ({
        ...c,
        conditionAssignments: buildConditionAssignments(patternIndex),
        taskOrder: shuffledTaskOrder()
      }))
      setAssignmentReady(true)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const updateStudyData = u => setStudyData(c => ({ ...c, ...u }))
  const saveTaskResponse = (id, r) => setStudyData(c => ({ ...c, taskResponses: { ...c.taskResponses, [id]: r } }))
  const value = useMemo(
    () => ({ studyData, updateStudyData, saveTaskResponse, assignmentReady }),
    [studyData, assignmentReady]
  )
  return <C.Provider value={value}>{children}</C.Provider>
}

export function useStudy() {
  const v = useContext(C)
  if (!v) throw new Error('useStudy must be used inside StudyProvider')
  return v
}
