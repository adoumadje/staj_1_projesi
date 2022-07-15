import React, { useRef, useState } from 'react'
import { Card, Form, Button, Container, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styles from './SignUp.module.css'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query } from 'firebase/firestore'
import { projectFirestore as db } from '../../firebase/config'
import { useEffect } from 'react'



const SignUp = () => {
    const photoInputRef = useRef()
    const userNameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const [isBusiness, setIsBusiness] = useState(false)
    const [storePosition, setStorePosition] = useState(null)
    const [isFirstRendering, setIsFirstRendering] = useState(true)

    const { signup } = useAuth()
    const [error, setError] = useState()
    const [success, setSucess] = useState()
    const [loading, setLoading] = useState()

    const [photoSrc, setPhotoSrc] = useState('https://png.pngtree.com/png-clipart/20190611/original/pngtree-business-profile-png-image_2610535.jpg')
    const navigate = useNavigate()

    
    useEffect(() => {
        if(isFirstRendering) {
            setIsFirstRendering(false)
            return
        }
        console.log(isBusiness)
        console.log(storePosition)
    }, [storePosition])

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

    function handleBusinessCheck(e) {
        setIsBusiness(e.target.checked)
        if(!isBusiness){
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

        if(isBusiness && storePosition === null) {
            return setError('Business location access denied')
        }

        try {
            setLoading(true)
            await signup(
                photoInputRef.current.files[0],
                userNameRef.current.value,
                emailRef.current.value,
                passwordRef.current.value,
                isBusiness,
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
    <>
        <Container 
            className='d-flex justify-content-center align-items-center'
            style={{ minHeight: '100vh' }}
        >
            <div className='w-100' style={{ maxWidth: '400px' }}>
                <Card>
                    <Card.Body>
                        <h2 className='text-center mb-4'>Sign Up</h2>
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
                                <Form.Control type='text' ref={userNameRef} required />
                            </Form.Group>
                            <Form.Group className='mb-2'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' ref={emailRef} required />
                            </Form.Group>
                            <Form.Group className='mb-2'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type='password' ref={passwordRef} required />
                            </Form.Group>
                            <Form.Group className='mb-2'>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type='password' ref={passwordConfirmRef} required />
                            </Form.Group>
                            <Form.Group className='mb-2'>
                                <Form.Check 
                                    type='checkbox' 
                                    label='I am a business'
                                    className='mt-3'
                                    onChange={handleBusinessCheck}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Button disabled={loading} type='submit' className='w-100 mt-3'>Sign Up</Button>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
                <div className='w-100 text-center mt-2'>
                    Already have an account ? <Link to='/login'>Log in</Link>
                </div>
            </div>
        </Container>
        
    </>
  )
}

export default SignUp