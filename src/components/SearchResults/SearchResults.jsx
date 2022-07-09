import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { projectFirestore as db } from '../../firebase/config'
import { useSearch } from '../contexts/SearchContext'
import Navbar from '../Navbar/Navbar'
import SearchResult from './SearchResult/SearchResult'

const SearchResults = () => {
    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    const { searchedProduct } = useSearch()

    async function fetchProducts() {
        let searchList = []
        const q = query(collection(db, 'products'), where('productName', '==', searchedProduct))
        const querySnapshots = await getDocs(q)
        querySnapshots.forEach(snapshot => {
            let doc = snapshot._document.data.value.mapValue.fields
            searchList.push({
                image: doc.productImage.stringValue,
                name: doc.productName.stringValue,
                description: doc.productDescription.stringValue,
                price: doc.productPrice.numberValue,
                storeLogo: getStoreLogo(doc.storeId.stringValue)
            })
        })
        setProducts(searchList)
    }

    function getStoreLogo(storeId) {
        
    }

  return (
    <Container className='w-50' style={{paddingTop: '150px'}}>
        <Navbar />
        <div className="title d-flex align-items-center mb-5"
            style={{cursor: 'pointer'}}
            onClick={() => navigate('/user-dashboard') }
        >
            <i className="bi bi-arrow-left-circle-fill"
                style={{
                    display: 'inline-block',
                    fontSize: '40px',
                    color: '#007bff',
                    marginRight: '35px'
                }}
            ></i>
            <h2>Search Results for "{searchedProduct}"</h2>
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