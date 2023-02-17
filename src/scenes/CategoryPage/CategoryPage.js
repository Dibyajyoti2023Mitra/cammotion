import { Box, useTheme } from '@mui/material'
import Category from 'components/Category/Category'
import CategoryTable from 'components/Category/CategoryTable'
// import CategoryTable from 'components/Category/CategoryTable'
import Header from '../../components/Header'

import React, { useState } from 'react'

function CateGoryPage() {
  const theme = useTheme()
  const [count,setCount]=useState(0)
  const [editEnable,setEditEnable] = useState(false)
  return (
    <Box m="1.5rem 2.5rem">
    <Header title="Category" subtitle="Category page" />
    <Box
      height="90vh"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: theme.palette.background.alt,
          color: theme.palette.secondary[100],
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: theme.palette.primary.light,
        },
        "& .MuiDataGrid-footerContainer": {
          backgroundColor: theme.palette.background.alt,
          color: theme.palette.secondary[100],
          borderTop: "none",
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: `${theme.palette.secondary[200]} !important`,
        },
      }}
    >
        <Category count={count} setCount={setCount}/>
        <CategoryTable count={count} setCount={setCount}/>
    </Box>
   </Box> 
      
  )
}

export default CateGoryPage