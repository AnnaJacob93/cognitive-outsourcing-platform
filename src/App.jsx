import { Navigate, Route, Routes } from 'react-router-dom'
import StudyLayout from './components/StudyLayout'
import WelcomePage from './pages/WelcomePage'
import StudyInformationPage from './pages/StudyInformationPage'
import ConsentPage from './pages/ConsentPage'
import InitialQuestionnairePage from './pages/InitialQuestionnairePage'
import InstructionsPage from './pages/InstructionsPage'
import TaskPage from './pages/TaskPage'
import FinalQuestionnairePage from './pages/FinalQuestionnairePage'
import DebriefPage from './pages/DebriefPage'
import CompletionPage from './pages/CompletionPage'
export default function App(){return <Routes><Route element={<StudyLayout/>}><Route path='/' element={<WelcomePage/>}/><Route path='/study-information' element={<StudyInformationPage/>}/><Route path='/consent' element={<ConsentPage/>}/><Route path='/initial-questionnaire' element={<InitialQuestionnairePage/>}/><Route path='/instructions' element={<InstructionsPage/>}/><Route path='/tasks/:taskIndex' element={<TaskPage/>}/><Route path='/final-questionnaire' element={<FinalQuestionnairePage/>}/><Route path='/debrief' element={<DebriefPage/>}/><Route path='/complete' element={<CompletionPage/>}/><Route path='*' element={<Navigate to='/' replace/>}/></Route></Routes>}

