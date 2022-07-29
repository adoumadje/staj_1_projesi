import React, { useState, useEffect } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { Container, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import { useAuth } from './contexts/AuthContext'
import Navbar from './Navbar/Navbar'
import { projectFirestore as db } from '../firebase/config'

function UserInfos() {
    const [user, setUser] = useState({})
    const { currentUser } = useAuth()
    const navigate = useNavigate()

    async function getUserName(currentUser) {
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

    async function isBusiness(currentUser) {
        let isBusy = false
        const q = query(collection(db, 'users'), where('email', '==', currentUser.email))
        const querySnapshots = await getDocs(q)
        querySnapshots.forEach((snapshot) => {
            let doc = snapshot._document.data.value.mapValue.fields
            isBusy = doc.isBusiness.booleanValue
        })
        return isBusy
    }

    useEffect(() => {
        const updateInfos = async () => {
            setUser({
                profilePic: await getPhotoURL(currentUser),
                username: await getUserName(currentUser),
                email: currentUser.email,
                hasBusinessStatus: await isBusiness(currentUser),
            })
        }
        updateInfos()
    }, [currentUser])

  return (
    <Container style={{paddingTop: '150px'}}>
        <Navbar />
        <Card className='mx-auto' style={{maxWidth: '550px'}}>
            <Card.Body className='px-5'>
                <div className='w-50 mx-auto mb-4'>
                    <img className='w-100' src={user.profilePic} />
                </div>
                <h2 className='h4 mb-3'><span className='fw-bold'><i className='fw-bold bi bi-person'></i> Username: </span>{user.username}</h2>
                <h2 className='h4 mb-3'><span className='fw-bold'><i className='fw-bold bi bi-envelope'></i> Email: </span>{user.email}</h2>
                <h2 className='h4 mb-3'><span className='fw-bold'><i className='fw-bold bi bi-briefcase'></i> Is a Business: </span>{user.hasBusinessStatus ? 'Yes' : 'No'}</h2>
                <Button 
                    className='w-100 mt-3 cursor-pointer' 
                    onClick={() => { 
                        navigate('/update-profile')
                    }}
                >
                    Update Profile
                </Button>
            </Card.Body>
        </Card>
    </Container>
  )
}

export default UserInfos