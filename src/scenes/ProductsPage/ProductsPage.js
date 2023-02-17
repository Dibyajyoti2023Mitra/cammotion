import Products from 'components/Products/Products'
import React, { useState } from 'react'
function ProductsPage() {
    const [count,setCount]=useState(0)
  return (
    <div>
        <Products count={count} setCount={setCount}/>
    </div>
  )
}

export default ProductsPage