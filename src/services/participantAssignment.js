import { doc, runTransaction } from 'firebase/firestore'
import { db } from './firebase'

// Uses a shared Firestore counter (meta/participantCounter) so AI
// condition assignment rotates in a fixed cycle across participants,
// instead of being assigned independently at random for each one.
// This guarantees that, across every `numPatterns` consecutive
// participants, each task appears with every condition roughly equally
// often at the sample level (not just within one participant's session).
//
// Falls back to a random pattern if Firestore is unreachable, so a
// connectivity issue never blocks someone from starting the study.
export async function getNextPatternIndex(numPatterns) {
  const counterRef = doc(db, 'meta', 'participantCounter')
  try {
    const newCount = await runTransaction(db, async tx => {
      const snap = await tx.get(counterRef)
      const current = snap.exists() ? snap.data().count : 0
      const next = current + 1
      tx.set(counterRef, { count: next }, { merge: true })
      return next
    })
    return (newCount - 1) % numPatterns
  } catch (error) {
    console.error('Falling back to a random rotation pattern:', error)
    return Math.floor(Math.random() * numPatterns)
  }
}
