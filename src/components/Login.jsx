import React, { useRef, useState } from 'react'
import { Card, Form, Button, Container, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { projectFirestore as db } from '../firebase/config'

const Login = () => {
    const userNameRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    async function isBusiness(username) {
        let isBusy = false
        const q = query(collection(db, 'users'), where('username', '==', username))
        const querySnapshots = await getDocs(q)
        querySnapshots.forEach((snapshot) => {
            let doc = snapshot._document.data.value.mapValue.fields
            isBusy = doc.isBusiness.booleanValue
        })
        return isBusy
    }


    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(userNameRef.current.value, passwordRef.current.value)
            if(await isBusiness(userNameRef.current.value)) {
                navigate('/business-dashboard')
            } else {
                navigate('/user-dashboard')
            }
        } catch(err) {
            setError(err.message)
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
                        <h2 className='text-center mb-4'>Login</h2>
                        {error && <Alert variant='danger'>{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className='mb-2'>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type='text' ref={userNameRef} required />
                            </Form.Group>
                            <Form.Group className='mb-2'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type='password' ref={passwordRef} required />
                            </Form.Group>
                            <Form.Group>
                                <Button disabled={loading} type='submit' className='w-100 mt-3'>Login</Button>
                            </Form.Group>
                            <div className='w-100 text-center mt-2'>
                                <Link to='/forgot-password'>Forgot Password?</Link>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
                <div className='w-100 text-center mt-2'>
                    Need an account ? <Link to='/sign-up'>Sign Up</Link>
                </div>
            </div>
        </Container>
        
    </>
  )
}

export default Login