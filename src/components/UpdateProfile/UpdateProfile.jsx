import React, { useRef, useState, useEffect } from 'react'
import { Card, Form, Button, Container, Alert } from 'react-bootstrap'
import styles from './UpdateProfile.module.css'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { projectFirestore as db } from '../../firebase/config'
import Navbar from '../Navbar/Navbar'

function UpdateProfile() {
    const photoInputRef = useRef()
    const userNameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    const [user, setUser] = useState({})

    const [changeLocation, setChangeLocation] = useState(false)
    const [isaBusiness, setIsaBusiness] = useState(false)
    const [storePosition, setStorePosition] = useState(null)
    const [isFirstRendering, setIsFirstRendering] = useState(true)

    const { currentUser, signup } = useAuth()
    const [error, setError] = useState()
    const [success, setSucess] = useState()
    const [loading, setLoading] = useState()

    const [photoSrc, setPhotoSrc] = useState('https://png.pngtree.com/png-clipart/20190611/original/pngtree-business-profile-png-image_2610535.jpg')
    const navigate = useNavigate()

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
            setPhotoSrc(user.profilePic)
        }

        updateInfos()

        if(isFirstRendering) {
            setIsFirstRendering(false)
            return
        }
    }, [storePosition, user, currentUser])

    const uploadPhoto = () => {
        const choosedFile = photoInputRef.current.files[0]
        if(choosedFile) {
            const reader = new FileReader()
            reader.readAsDataURL(choosedFile)
            reader.onload = () => {
                setPhotoSrc(reader.result)
            }
        }
    }

    async function isTakenUsername(username) {
        let isTaken = false
        const q = query(collection(db, 'users'))
        const querySnapshots = await getDocs(q)
        querySnapshots.forEach((snapshot) => {
            let doc = snapshot._document.data.value.mapValue.fields
            isTaken = (doc.username.stringValue === username)
        })
        return isTaken
    }

    function handleLocationCheck(e) {
        setChangeLocation(e.target.checked)
        if(!changeLocation){
            navigator.geolocation.getCurrentPosition((position) => {
                setStorePosition({
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                })
            })
        } else {
            setStorePosition(null)
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if(passwordRef.current.value !==
            passwordConfirmRef.current.value) {
                return setError('passwords do not match')
        }

        if(await isTakenUsername(userNameRef.current.value)) {
            return setError('This username is taken')
        }

        if(changeLocation && storePosition === null) {
            return setError('Business location access denied')
        }

        try {
            setLoading(true)
            await signup(
                photoInputRef.current.files[0],
                userNameRef.current.value,
                emailRef.current.value,
                passwordRef.current.value,
                changeLocation,
                storePosition,
            )
            setError('')
            setSucess('Account Successfully created')
            setTimeout(() => {
                navigate('/login')
            }, 3000)
        } catch(err) {
            setError(err.message)
            setSucess('')
        }

        setLoading(false)
    }

  return (
    <div>
        <Container style={{paddingTop: '150px'}}>
            <Navbar />
            <Card className='mx-auto' style={{maxWidth: '500px'}}>
                <Card.Body className='px-5'>
                    <h2 className='text-center mb-4'>Update Profile</h2>
                    { error && <Alert variant='danger'>{error}</Alert>}
                    { success && <Alert variant='success'>{success}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='mb-2'>
                            <div className={styles.profilePic}>
                                <img src={photoSrc} alt="profile pic" />
                                <input type="file" id='file' onChange={uploadPhoto} ref={photoInputRef} />
                                <label htmlFor="file">
                                    <i className="bi bi-camera-fill"></i> Upload
                                </label>
                            </div>
                        </Form.Group>
                        <Form.Group className='mb-2'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type='text' ref={userNameRef} defaultValue={user.username} required />
                        </Form.Group>
                        <Form.Group className='mb-2'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} defaultValue={user.email} required />
                        </Form.Group>
                        <Form.Group className='mb-2'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Leave blank to keep the same' ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group className='mb-2'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type='password' placeholder='Leave blank to keep the same' ref={passwordConfirmRef} required />
                        </Form.Group>
                        {isaBusiness && (<Form.Group className='mb-2'>
                            <Form.Check 
                                type='checkbox' 
                                label='Change Location'
                                className='mt-3'
                                onChange={handleLocationCheck}
                            />
                        </Form.Group>)}
                        <Form.Group>
                            <Button disabled={loading} type='submit' className='w-100 mt-3'>Update Profile</Button>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    </div>
  )
}

export default UpdateProfile