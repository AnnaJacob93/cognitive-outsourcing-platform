export default function ProgressBar({current,total,label='Study progress'}){const p=total?Math.round(current/total*100):0;return <div className='progress-wrap' aria-label={label}><div className='progress-meta'><span>{label}</span><span>{p}%</span></div><div className='progress-track'><div className='progress-fill' style={{width:`${p}%`}}/></div></div>}

