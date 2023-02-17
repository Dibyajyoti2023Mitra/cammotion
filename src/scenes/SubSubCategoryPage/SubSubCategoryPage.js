// import SubCategory from 'components/SubCategory/SubCategory'
import { Box } from '@mui/material'
import SubSubCategory from 'components/SubSubCategory.js/SubSubCategory'
import React, { useState } from 'react'
import HttpClient from 'utils/HttpClient'

function SubSubCategoryPage() {
  const [count,setCount]=useState(0)
  return (
    <div>
      {/* <Header title="Product" subtitle="Product page" /> */}
      <SubSubCategory count={count} setCount={setCount}/>
    </div>
    
  )
}

export default SubSubCategoryPage