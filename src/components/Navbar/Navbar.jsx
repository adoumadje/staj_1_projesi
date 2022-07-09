import React, { useEffect, useState } from 'react'
import styles from './Navbar.module.css'
import { useAuth } from '../contexts/AuthContext'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { projectFirestore as db } from '../../firebase/config'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const [profilePic, setProfilePic] = useState('https://www.10doigts.fr/assets/products/cartes-300-grm2-blanc-10-feuilles-a4-12251.jpg')

    const [showMenu, setShowMenu] = useState(false)
    const { currentUser, logout } = useAuth()
    const [username, setUsername] = useState('Someone Famous')
    const [email, setEmail] = useState('info@gmail.com')
    const navigate = useNavigate()


    async function getUsername(currentUser) {
        let username = ''
        const q = query(collection(db, 'users'), where('email', '==', currentUser.email))
        const querySnapshots = await getDocs(q)
        querySnapshots.forEach((snapshot) => {
            let doc = snapshot._document.data.value.mapValue.fields
            username = doc.username.stringValue
        })
        return username
    }

    async function getPhotoURL(currentUser) {
        let profilURL = ''
        const q = query(collection(db, 'users'), where('email', '==', currentUser.email))
        const querySnapshots = await getDocs(q)
        querySnapshots.forEach((snapshot) => {
            let doc = snapshot._document.data.value.mapValue.fields
            profilURL = doc.profilURL.stringValue
        })
        return profilURL
    }


    useEffect(() => {
        const updateInfos = async () => {
            setUsername(await getUsername(currentUser))
            setEmail(currentUser.email)
            setProfilePic(await getPhotoURL(currentUser))
        }
        if(!currentUser) {
            navigate('/login')
            return
        }
        updateInfos()
    }, [currentUser])

  return (
    <div className={styles.navbar}>
        <div 
            className='d-flex justify-content-between align-items-center' 
            style={{width: '50%'}}
        >
            <h1 style={{
                    fontFamily: 'Clicker Script',
                    fontWeight: '800',
                    color: '#fff'
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
                    <h3>{username}<br/><span>{email}</span></h3>
                    <ul>
                        <li>
                            <img src="https://cdn-icons-png.flaticon.com/512/618/618631.png" alt="" />
                            <h6>My Profile</h6>
                        </li>
                        <li>
                            <img src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png" alt="" />
                            <h6>Edit Profile</h6>
                        </li>
                        <li>
                            <img src="https://cdn-icons-png.flaticon.com/512/1250/1250678.png" alt="" />
                            <h6 onClick={logout}>Logout</h6>
                        </li>
                    </ul>
                </div>}
            </div>
        </div>
    </div>
  )
}

export default Navbar