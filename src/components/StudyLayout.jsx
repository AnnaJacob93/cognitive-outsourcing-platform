import { Outlet } from 'react-router-dom'
export default function StudyLayout(){return <div className='app-shell'><header className='site-header'><div><p className='eyebrow'>Research Study</p><h1 className='site-title'>AI Decision Study</h1></div></header><main className='page-container'><Outlet/></main><footer className='site-footer'>Southampton Solent University dissertation research</footer></div>}

