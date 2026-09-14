// Exports every document from the "participants" Firestore collection.
//
// Produces, inside ./export-output:
//   - participants.json  (full nested backup, exactly as stored in Firestore)
//   - raw-dataset.csv     (flattened, one row per task response — ONLY the
//                          raw fields collected during the study, no
//                          calculated/derived columns)
//
// Usage:
//   1. npm install
//   2. Put your service account key JSON in this same folder
//   3. node export-firestore.js <your-service-account-key-filename.json>

import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { readFileSync, mkdirSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const keyFileName = process.argv[2]
if (!keyFileName) {
  console.error('Usage: node export-firestore.js <service-account-key-filename.json>')
  process.exit(1)
}

const serviceAccount = JSON.parse(readFileSync(join(__dirname, keyFileName), 'utf8'))

initializeApp({ credential: cert(serviceAccount) })
const db = getFirestore()

// Exact raw field list — nothing calculated or derived gets added here.
const RAW_COLUMNS = [
  'participantId',
  'ageGroup',
  'educationLevel',
  'aiUseFrequency',
  'selfRatedAI',
  'trustInAI',
  'aiDependence',
  'taskId',
  'category',
  'difficulty',
  'taskOrder',
  'aiCondition',
  'initialAnswer',
  'correctAnswer',
  'initialCorrect',
  'initialConfidence',
  'explanationViewed',
  'finalAnswer',
  'finalCorrect',
  'finalConfidence',
  'answerChanged',
  'confidenceShift',
  'timeSpent',
  'justification'
]

function toCsvValue(value) {
  const str = value === null || value === undefined ? '' : String(value)
  if (/[",\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`
  return str
}

async function main() {
  const snapshot = await db.collection('participants').get()
  const participants = []
  const rows = []

  snapshot.forEach(docSnap => {
    const data = docSnap.data()
    participants.push({ participantId: docSnap.id, ...data })

    const responses = data.taskResponses || {}
    Object.values(responses).forEach(r => {
      rows.push({
        participantId: docSnap.id,
        ageGroup: data.demographics?.ageGroup ?? '',
        educationLevel: data.demographics?.educationLevel ?? '',
        aiUseFrequency: data.demographics?.aiUseFrequency ?? '',
        selfRatedAI: data.demographics?.selfRatedAiLiteracy ?? '',
        trustInAI: data.finalQuestionnaire?.trustInAi ?? '',
        aiDependence: data.finalQuestionnaire?.aiDependence ?? '',
        taskId: r.taskId,
        category: r.category,
        difficulty: r.difficulty,
        taskOrder: r.taskOrder,
        aiCondition: r.aiCondition,
        initialAnswer: r.initialAnswer,
        correctAnswer: r.correctAnswer,
        initialCorrect: r.initialCorrect,
        initialConfidence: r.initialConfidence,
        explanationViewed: r.explanationViewed,
        finalAnswer: r.finalAnswer,
        finalCorrect: r.finalCorrect,
        finalConfidence: r.finalConfidence,
        answerChanged: r.answerChanged,
        confidenceShift: r.confidenceShift,
        timeSpent: r.timeSpent,
        justification: r.justification
      })
    })
  })

  const outDir = join(__dirname, 'export-output')
  mkdirSync(outDir, { recursive: true })

  writeFileSync(join(outDir, 'participants.json'), JSON.stringify(participants, null, 2))

  if (rows.length) {
    const csvLines = [
      RAW_COLUMNS.join(','),
      ...rows.map(row => RAW_COLUMNS.map(h => toCsvValue(row[h])).join(','))
    ]
    // UTF-8 BOM so Excel renders special characters (e.g. the en-dash in
    // age ranges like "25–34") correctly instead of showing mojibake.
    writeFileSync(join(outDir, 'raw-dataset.csv'), '\uFEFF' + csvLines.join('\n'))
  }

  console.log(`Exported ${participants.length} participants and ${rows.length} task responses to ./export-output`)
  console.log('  - participants.json  (full nested backup)')
  console.log('  - raw-dataset.csv    (flattened, raw fields only)')
}

main().catch(err => {
  console.error('Export failed:', err)
  process.exit(1)
})
