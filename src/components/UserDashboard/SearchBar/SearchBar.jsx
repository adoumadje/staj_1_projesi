import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearch } from '../../contexts/SearchContext'
import './SearchBar.css'

function SearchBar({data}) {
  const [filteredData, setFilteredData] = useState([])
  const [wordEntered, setWordEntered] = useState('') 
  const { setSearchedProduct } = useSearch()
  const navigate = useNavigate()

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

  function handleSearchBtnClick() {
    setSearchedProduct(wordEntered)
    navigate('/search-results')
  }

  function handleLinkClick(e) {
    setSearchedProduct(e.target.textContent)
    navigate('/search-results')
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
                <i className="bi bi-search" onClick={handleSearchBtnClick} />
              ) : (
                <i className="bi bi-x-lg" onClick={clearInput} />)}

          </div>
        </div>
        {filteredData.length !== 0 && (<div className="dataResult">
          {filteredData.slice(0,4).map((prodName, index) => (
            <div className='link' key={index}><p onClick={handleLinkClick}>{prodName}</p></div>
          ))}
        </div>)}
    </div>
  )
}

export default SearchBar