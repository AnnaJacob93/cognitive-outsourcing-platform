import { doc, setDoc } from 'firebase/firestore'
import { db } from './firebase'

export async function submitStudy(studyData) {
  try {
    await setDoc(doc(db, 'participants', studyData.participantId), studyData)
    return { success: true }
  } catch (error) {
    console.error('Failed to submit study data:', error)
    return { success: false, error }
  }
}
