import React, { useRef } from 'react'
import { Card, Form, Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Login = () => {
    const userNameRef = useRef()
    const passwordRef = useRef()

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
                        <Form>
                            <Form.Group className='mb-2'>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type='text' ref={userNameRef} required />
                            </Form.Group>
                            <Form.Group className='mb-2'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type='password' ref={passwordRef} required />
                            </Form.Group>
                            <Form.Group>
                                <Button type='submit' className='w-100 mt-3'>Login</Button>
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