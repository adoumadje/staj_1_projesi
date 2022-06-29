import React from 'react'
import { Container, Button } from 'react-bootstrap'
import Navbar from '../Navbar/Navbar'
import styles from './UserDashboard.module.css'

const UserDashboard = () => {
  return (
    <Container style={{paddingTop: '150px'}}>
        <Navbar />
        <div className="mb-4 mx-auto" style={{width: '40%'}}>
            <label htmlFor="prodNameInp" className='form-label'>Product Name</label>
            <input type="text" className='form-control' id='prodNameInp' />
        </div>
        <h3 className='text-center' 
            style={{
                fontSize: '15px',
                fontWeight: '600'
            }}
        >
            OR
        </h3>
        <div className={styles.barcode}>
            <img src="https://previews.123rf.com/images/koblizeek/koblizeek2001/koblizeek200100047/138111817-barcode-vector-icon-bar-code-for-web-app-ui-design-isolated-illustration-.jpg" alt=""/>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div className="w-25 mx-auto" style={{marginTop: '200px'}}>
            <Button className='w-100' color='#fff'>Find Product</Button>
        </div>
    </Container>
  )
}

export default UserDashboard