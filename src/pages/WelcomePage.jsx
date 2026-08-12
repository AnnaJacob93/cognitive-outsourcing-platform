import {useNavigate} from 'react-router-dom'
import PageCard from '../components/PageCard'
export default function WelcomePage(){const n=useNavigate();return <PageCard title='Welcome' intro='Thank you for considering participation in this study about how people make decisions when using AI recommendations.'><div className='info-box'><p><strong>Estimated duration:</strong> approximately 10–15 minutes.</p><p>No account, name or email address is required.</p></div><div className='actions'><button className='button primary' onClick={()=>n('/study-information')}>Start study</button></div></PageCard>}

