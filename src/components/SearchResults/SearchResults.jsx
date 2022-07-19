import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { projectFirestore as db } from '../../firebase/config'
import { useSearch } from '../contexts/SearchContext'
import Navbar from '../Navbar/Navbar'
import SearchResult from './SearchResult/SearchResult'

const SearchResults = () => {
    const [products, setProducts] = useState([])
    const [userPosition, setUserPosition] = useState({})
    const navigate = useNavigate()
    const { searchedProduct } = useSearch()

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setUserPosition({
                lat: position.coords.latitude,
                long: position.coords.longitude,
            })
        })
    }, [userPosition])

    async function fetchProducts() {
        let searchList = []
        const q = query(collection(db, 'products'), where('productName', '==', searchedProduct))
        let querySnapshots = await getDocs(q)
        querySnapshots = querySnapshots._snapshot.docChanges
        for(const snapshot of querySnapshots){
            let doc = snapshot.doc.data.value.mapValue.fields
            let storeLogo = await getStoreLogo(doc.storeId.stringValue)
            let storeDistance = await getStoreDistance(doc.storeId.stringValue)
            searchList.push({
                id: doc.productId.stringValue,
                image: doc.productImage.stringValue,
                name: doc.productName.stringValue,
                description: doc.productDescription.stringValue,
                price: doc.productPrice.doubleValue,
                storeLogo,
                storeDistance,
            })
        }
        setProducts(searchList)
    }

    async function getStoreLogo(storeId) {
        let storeLogo = 'logo'
        const docRef = doc(db, 'users', storeId)
        const snapshot = await getDoc(docRef)
        const uDoc = snapshot._document.data.value.mapValue.fields
        storeLogo = uDoc.profilURL.stringValue
        return storeLogo
    }

    async function getStoreDistance(storeId) {
        const docRef = doc(db, 'users', storeId)
        const snapshot = await getDoc(docRef)
        const uDoc = snapshot._document.data.value.mapValue.fields
        const storePositionMap = uDoc.storePosition.mapValue.fields 
        const storePosition = {
            lat: storePositionMap.lat.doubleValue,
            long: storePositionMap.long.doubleValue,
        }
        const storeDistance = calculateDistance(userPosition, storePosition)
        return storeDistance
    }

    function calculateDistance(pos1, pos2) {
        const sqrLatDiff = Math.pow(pos1.lat - pos2.lat, 2)
        const sqrLongDiff = Math.pow(pos1.long - pos2.long, 2)
        const distance = Math.sqrt(sqrLatDiff + sqrLongDiff)
        return distance.toFixed(1)
    }

    useEffect(() => {
        const fetchProds = async () => {
            await fetchProducts()
        }
        fetchProds()
    }, [products])

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
        {products.length === 0 
        ? (<div className='no-result'>
                <p style={{fontSize: '18px'}}>No Result...</p>
            </div>
            ) : (
            <div className="results">
                {products.map(product => (<SearchResult key={product.id} product={product} />))}
            </div>)}
    </Container>
  )
}

export default SearchResults