import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { StudyProvider } from './context/StudyContext'
import './styles/global.css'
createRoot(document.getElementById('root')).render(<StrictMode><BrowserRouter><StudyProvider><App /></StudyProvider></BrowserRouter></StrictMode>)

