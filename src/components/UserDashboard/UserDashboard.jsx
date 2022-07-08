import React, { useEffect, useState } from 'react'
import { Container, Button } from 'react-bootstrap'
import Navbar from '../Navbar/Navbar'
import styles from './UserDashboard.module.css'
import SearchBar from './SearchBar/SearchBar'
import { collection, getDocs, query } from 'firebase/firestore'
import { projectFirestore as db } from '../../firebase/config'

const UserDashboard = () => {
    const [productNames, setProductNames] = useState([])

    async function getProductNames() {
        let prodNames = []
        const q = query(collection(db, 'products'))
        const querySnapshots = await getDocs(q)
        querySnapshots.forEach(snapshot => {
            let doc = snapshot._document.data.value.mapValue.fields
            prodNames.push(doc.productName.stringValue)
        })
        prodNames = [...new Set(prodNames)]
        return prodNames
    }

    useEffect(() => {
        const setData = async () => {
            let prodNames = await getProductNames()
            setProductNames(prodNames)
        }
        setData()
    }, [])

  return (
    <Container style={{paddingTop: '150px'}}>
        <Navbar />
        <div className="mb-4 mx-auto" style={{width: '40%'}}>
            <SearchBar data={productNames} />
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