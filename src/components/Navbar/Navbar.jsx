import React, { useState } from 'react'
import styles from './Navbar.module.css'

const Navbar = () => {
    const [profilePic, setProfilePic] = useState('https://images.pexels.com/photos/3134555/pexels-photo-3134555.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')

    const [showMenu, setShowMenu] = useState(false)

  return (
    <div className={styles.navbar}>
        <div 
            className='d-flex justify-content-between align-items-center' 
            style={{width: '50%'}}
        >
            <h1 style={{
                    fontFamily: 'Clicker Script',
                    fontWeight: '400'
                }}
            >
                Logo
            </h1>
            <div style={{position: 'relative'}}>
                <div 
                    className={styles.profile} 
                    onClick={() => {
                        setShowMenu(prevShowMenu => !prevShowMenu)
                    }}
                >
                    <img src={profilePic} alt="Profile Pic" />
                </div>
                {showMenu && <div className={styles.menu}>
                    <h3>Someone Famous<br/><span>info@gmail.com</span></h3>
                    <ul>
                        <li>
                            <img src="https://cdn-icons-png.flaticon.com/512/618/618631.png" alt="" />
                            <a href="">My Profile</a>
                        </li>
                        <li>
                            <img src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png" alt="" />
                            <a href="">Edit Profile</a>
                        </li>
                        <li>
                            <img src="https://cdn-icons-png.flaticon.com/512/1250/1250678.png" alt="" />
                            <a href="">Logout</a>
                        </li>
                    </ul>
                </div>}
            </div>
        </div>
    </div>
  )
}

export default Navbar