import React, { useState } from 'react'
import { Container, Button, Alert } from 'react-bootstrap'
import Navbar from './Navbar/Navbar'
import * as XLSX from 'xlsx'
import { addDoc, collection, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { projectFirestore as db } from '../firebase/config'
import { useAuth } from './contexts/AuthContext'
import { useEffect } from 'react'

const BusinessDashboard = () => {
    const [items, setItems] = useState([])
    const [tableHeaders, setTableHeaders] = useState([])
    const [unpushable, setUnpushable] = useState(true)
    const [error, setError] = useState()
    const [success, setSucess] = useState(false)
    const { currentUser } = useAuth()

    useEffect(() => {

    }, [])

    function onUploadFile(e) {
        let file = e.target.files[0]
        console.log(file)
        const xlxsDocType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        const csvDocType = 'application/vnd.ms-excel'
        
        if(file.type !== xlxsDocType && file.type !== csvDocType) {
            setError('wrong document type. Please upload an excel file')
            return
        }

        setError('')
        setSucess(false)
        readExcel(file)
    }

    function readExcel(file) {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsArrayBuffer(file)

            fileReader.onload = (e) => {
                const bufferArray = e.target.result
                const workBook = XLSX.read(bufferArray, { type: 'buffer' })
                const workSheetName = workBook.SheetNames[0]
                const workSheet = workBook.Sheets[workSheetName]
                const data = XLSX.utils.sheet_to_json(workSheet)
                resolve(data)
            } 

            fileReader.onerror = (err) => {
                console.log(err);
                reject(err)
            }
        })

        promise.then((data) => {
            setItems(data)
            setTableHeaders(Object.keys(data[0]))
            setUnpushable(false)
        }).catch((err) => {
            setError(err.message)
        })
    }

    async function pushData() {
        const collectionRef = collection(db, 'products')
        setUnpushable(true)
        for(const item of items) {
            let docRef = await addDoc(collectionRef, item)
            let storeId = await getStoreId(currentUser)
            await updateDoc(docRef, {productId: docRef.id, storeId})
        }
        setSucess(true)
    }

    async function getStoreId(currentStore) {
        let storeId = ''
        const q = query(collection(db, 'users'), where('email', '==', currentStore.email))
        const querySnapshots = await getDocs(q)
        querySnapshots.forEach(snapshot => {
            let doc = snapshot._document.data.value.mapValue.fields
            storeId = doc.Id.stringValue
        })
        return storeId
    }

  return (
    <Container style={{paddingTop: '150px'}}>
        <Navbar />
        <div className="mb-3 mx-auto w-50">
            <label htmlFor="uploadFileInput" className="form-label">Upload your CSV file</label>
            {error && <Alert className='mt-2 mb-2' variant='danger'>{error}</Alert>}
            <input type="file" className='form-control' id="uploadFileInput" onChange={onUploadFile} />
        </div>
        <div className="data mt-5 w-100 mx-auto">
            {items.length !== 0 && (<table className="table table-striped">
                <thead>
                    <tr>
                        {tableHeaders.map((header, index) => (
                            <th scope='col' key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            {tableHeaders.map((header, index) => (
                                <td key={index}>{item[header]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>)}
        </div>
        {success && <Alert className='mt-5 mx-auto w-75 text-center' variant='success'>Data pushed successfully</Alert>}
        <div className="w-25 mx-auto mb-5" style={{marginTop: '20px'}}>
            <Button disabled={unpushable} onClick={pushData} className='w-100' color='#fff'>Push Data</Button>
        </div>
    </Container>
  )
}

export default BusinessDashboard