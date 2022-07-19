import React from 'react'
import { Button } from 'react-bootstrap'
import styles from './SearchResult.module.css'

const SearchResult = ({product}) => {
  
  function truncateText(text, maxLength) {
    let truncated = text
    if(truncated.length > maxLength) {
      truncated = truncated.substring(0, maxLength) + '...'
    }
    return truncated
  }

  return (
    <div className={styles.result}>
      <div className={styles.productImg}>
        <img src={product.image} alt="" />
      </div>
      <div className={styles.productInfo}>
        <h2>{product.name}</h2>
        <p>{truncateText(product.description, 207)}</p>
      </div>
      <div className={styles.storeLogo}>
        <img src={product.storeLogo} alt="" />
      </div>
      <div className={styles.productPrice}>
        <h4>{product.price}₺</h4>
        <Button style={{fontSize: '8px', fontWeight: '600'}}>Go to Store</Button>
      </div>
      <div className={styles.storeDistance}>
        <h4>Distance:<br/><span>{product.storeDistance} km</span></h4>
      </div>
    </div>
  )
}

export default SearchResult