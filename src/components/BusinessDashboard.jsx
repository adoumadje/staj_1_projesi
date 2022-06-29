import React from 'react'
import { Container, Button } from 'react-bootstrap'
import Navbar from './Navbar/Navbar'

const BusinessDashboard = () => {
  return (
    <Container style={{paddingTop: '150px'}}>
        <Navbar />
        <div className="mb-3 mx-auto w-50">
            <label htmlFor="uploadFileInput" className="form-label">Upload your CSV file</label>
            <input type="file" className='form-control' id="uploadFileInput" />
        </div>
        <div className="data mt-5 w-75 mx-auto">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td colspan="2">Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className="w-25 mx-auto" style={{marginTop: '200px'}}>
            <Button className='w-100' color='#fff'>Push Data</Button>
        </div>
    </Container>
  )
}

export default BusinessDashboard