import React, { useState } from 'react'
import './SearchBar.css'
import { Link } from 'react-router-dom'

function SearchBar({data}) {
  const [filteredData, setFilteredData] = useState([])
  const [wordEntered, setWordEntered] = useState('') 

  function handleFilter(e) {
    let searchWord = e.target.value 
    setWordEntered(searchWord)
    const newFilter = data.filter((value) => {
      return value.toLowerCase().includes(searchWord.toLowerCase())
    })
    if(searchWord === '') {
      setFilteredData([])
    } else {
      setFilteredData(newFilter)
    }
  }

  function searchProduct() {
    
  }

  function clearInput() {
    setWordEntered('')
    setFilteredData([])
  }

  return (
    <div className='search'>
        <div className="searchInput">
          <input type="text" placeholder='Enter a product name' value={wordEntered} onChange={handleFilter} />
          <div className="searchIcon">
            {filteredData.length === 0 ? ( 
                <i className="bi bi-search" onClick={searchProduct}></i>
              ) : (
                <i class="bi bi-x-lg" onClick={clearInput}></i>)}

          </div>
        </div>
        {filteredData.length !== 0 && (<div className="dataResult">
          {filteredData.slice(0,4).map((prodName, index) => (
            <Link to='/search-results' className='link' key={index}><p>{prodName}</p></Link>
          ))}
        </div>)}
    </div>
  )
}

export default SearchBar