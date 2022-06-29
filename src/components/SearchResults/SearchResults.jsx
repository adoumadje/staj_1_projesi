import React from 'react'
import { Container } from 'react-bootstrap'
import Navbar from '../Navbar/Navbar'
import SearchResult from './SearchResult/SearchResult'

const SearchResults = () => {
  return (
    <Container className='w-50' style={{paddingTop: '150px'}}>
        <Navbar />
        <div className="title d-flex align-items-center mb-5">
            <i class="bi bi-arrow-left-circle-fill"
                style={{
                    display: 'inline-block',
                    fontSize: '40px',
                    color: '#007bff',
                    marginRight: '35px'
                }}
            ></i>
            <h2>Search Results for "Product Name"</h2>
        </div>
        <div className="results">
            <SearchResult />
            <SearchResult />
            <SearchResult />
            <SearchResult />
            <SearchResult />
        </div>
    </Container>
  )
}

export default SearchResults