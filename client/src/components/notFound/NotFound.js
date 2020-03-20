import React, {useState} from 'react'
import NotFounding from './404.png'
import  './style.scss'
function NotFound() {
    const [animationType, setAnimationType] = useState('swing')

    const enter = () => {
        setAnimationType('hinge')
        setTimeout(() => {
            setAnimationType('lightSpeedIn')
        }, 2000);
    }
    return (
        <div className="notFound-container">
            <img src={NotFounding} className={`animated ${animationType}`} onMouseEnter={enter} />
        </div>
    )
}

export default NotFound
