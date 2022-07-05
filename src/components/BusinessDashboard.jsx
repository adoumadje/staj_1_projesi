import React, { useState } from 'react'
import { Container, Button, Alert } from 'react-bootstrap'
import Navbar from './Navbar/Navbar'
import * as XLSX from 'xlsx'

const BusinessDashboard = () => {
    const [items, setItems] = useState([])
    const [tableHeaders, setTableHeaders] = useState([])
    const [error, setError] = useState()

    function onUploadFile(e) {
        let file = e.target.files[0]
        const xlxsDocType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        
        if(file.type !== xlxsDocType) {
            setError('wrong document type. Please upload an excel file')
            return
        }

        setError('')
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

            file.onerror = (err) => {
                reject(err)
            }
        })

        promise.then((data) => {
            createTable(data)
        }).catch((err) => {
            setError(err.message)
        })
    }

    function createTable(data) {
        setItems(data)
        setTableHeaders(Object.keys(items[0]))
    }

  return (
    <Container style={{paddingTop: '150px'}}>
        <Navbar />
        <div className="mb-3 mx-auto w-50">
            <label htmlFor="uploadFileInput" className="form-label">Upload your CSV file</label>
            {error && <Alert className='mt-2 mb-2' variant='danger'>{error}</Alert>}
            <input type="file" className='form-control' id="uploadFileInput" onChange={onUploadFile} />
        </div>
        <div className="data mt-5 w-75 mx-auto">
            {items.length && <table className="table table-striped">
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
            </table>}
        </div>
        <div className="w-25 mx-auto mb-5" style={{marginTop: '100px'}}>
            <Button className='w-100' color='#fff'>Push Data</Button>
        </div>
    </Container>
  )
}

export default BusinessDashboard