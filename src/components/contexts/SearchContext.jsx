import React, { useContext, useState } from 'react'


const SearchContext = React.createContext()

export function useSearch() {
    return useContext(SearchContext)
}



function SearchProvider({children}) {
    const [searchedProduct, setSearchedProduct] = useState('')

    const value = {
        searchedProduct,
        setSearchedProduct
    }

  return (
    <SearchContext.Provider value={value}>
        {children}
    </SearchContext.Provider>
  )
}

export default SearchProvider