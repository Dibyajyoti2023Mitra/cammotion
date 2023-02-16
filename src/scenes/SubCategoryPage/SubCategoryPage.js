import SubCategory from 'components/SubCategory/SubCategory'
// import SubCatTable from 'components/SubCategory/SubCatTable'
import { useState } from 'react'
import React from 'react'

function SubCategoryPage() {
  const [count,setCount]=useState(0)
  return (
    <div>
        <SubCategory count={count} setCount={setCount}/>
        {/* <SubCatTable count={count} setCount={setCount}/> */}
    </div>
  )
}

export default SubCategoryPage