import React from 'react'
import './index.css'

import logo from '../../assests/logo.jpg'
import user from '../../assests/user.png'

export default ({black}) => {
    return (
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="">
                    <img src={logo} />
                </a>
            </div>
            <div className="header--user">
                <a href="">
                    <img src={user} />
                </a>
                
            </div>
        </header>
    )
}