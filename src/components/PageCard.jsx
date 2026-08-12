export default function PageCard({title,intro,children}){return <section className='card'><h2>{title}</h2>{intro&&<p className='lead'>{intro}</p>}{children}</section>}

