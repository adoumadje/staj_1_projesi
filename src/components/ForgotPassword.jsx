import React, { useRef } from 'react'
import { Container, Form, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
    const emailRef = useRef()

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
                        <Form>
                            <Form.Group className='mb-2'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' ref={emailRef} required />
                            </Form.Group>
                            <Form.Group>
                                <Button type='submit' className='w-100 mt-3'>Reset Password</Button>
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