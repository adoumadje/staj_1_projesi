import React from 'react'
import { Button } from 'react-bootstrap'
import styles from './SearchResult.module.css'

const SearchResult = () => {
  return (
    <div className={styles.result}>
      <div className={styles.productImg}>
        <img src="https://d8.cnnx.io/image/obj/16588171612;sq=75;p=0;t=ooPwmM0WTWKQVE9JRlQxe77evbZuk6332WBmP4KmtReI0jqha701YszCen6EIKdASpWEOmftoRx0vdaFYEGFT8V02UwiYXMBIcXHPbP_9BBI1fFtJhIzmKM9ulAv3Ffu7mWRxIIhI74vNdg8tJV5iUFha00WMZ5atsrK2kGM8EqCfaIJyiNjCQ8NVeHn7lbee0at;cc=US" alt="" />
      </div>
      <div className={styles.productInfo}>
        <h2>Hypebeast 0ff-White AJ Chicago Nike iphone</h2>
        <p>Hypebeast 0ff-White AJ Chicago Nike iphone case 12 Pro max 12/12 Pro 12 mini iphone 11 Pro Max 11/11 Pro iphone X/XS Max XR iPhone 7/13</p>
      </div>
      <div className={styles.storeLogo}>
        <img src="https://s7.cnnx.io/merchant/little/401.gif" alt="" />
      </div>
      <div className={styles.productPrice}>
        <h4>$50.99</h4>
        <Button style={{fontSize: '8px', fontWeight: '600'}}>Go to Store</Button>
      </div>
      <div className={styles.storeDistance}>
        <h4>Distance:<br/><span>10km</span></h4>
      </div>
    </div>
  )
}

export default SearchResult