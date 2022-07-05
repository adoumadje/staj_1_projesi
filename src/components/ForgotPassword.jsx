import React, { useRef, useState } from 'react'
import { Container, Form, Card, Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'

const ForgotPassword = () => {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setMessage('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for reset instructions')
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
                        <h2 className='text-center mb-4'>Password Reset</h2>
                        {error && <Alert variant='danger'>{error}</Alert>}
                        {message && <Alert variant='success'>{message}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className='mb-2'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' ref={emailRef} required />
                            </Form.Group>
                            <Form.Group>
                                <Button type='submit' className='w-100 mt-3' disabled={loading}>Reset Password</Button>
                            </Form.Group>
                            <div className='w-100 text-center mt-2'>
                                <Link to='/login'>Log In</Link>
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

export default ForgotPassword