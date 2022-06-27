import React, { useRef } from 'react'
import { Card, Form, Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const SignUp = () => {
    const profilPhotoRef = useRef()
    const userNameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const isletmeRef = useRef()

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
                        <Form>
                            <Form.Group className='mb-2'>
                                <Form.Label>Profil Photo</Form.Label>
                                <Form.Control type='file' ref={profilPhotoRef} required />
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
                                    type='checkbox' ref={isletmeRef} required 
                                    label='I am a business'
                                    className='mt-3'
                                />
                            </Form.Group>
                            <Form.Group>
                                <Button type='submit' className='w-100 mt-3'>Sign Up</Button>
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