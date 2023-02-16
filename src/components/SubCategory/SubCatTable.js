import { Box, Button } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import React, { useState,useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import HttpClient from 'utils/HttpClient'


function SubCatTable({values,count,setCount}) {
  // useEffect(()=>{
  //   console.log("subcattable rendered")
  // },[])
    const [pageSize,setPageSize]=useState(5)
    const navigate=useNavigate()
    const [isLoading,setIsLoading]=useState(true)
    const [rows,setRows]=useState([])

    const editSubCategory=(row)=>{
        const route=`/subcategory/${row._id}`
        navigate(route,{state:row})          
    }

    const fetchSubCategoryData=async()=>{
      const result=await HttpClient.requestData("get-subcategory","GET",values)
      console.log(result.data,"tabledata")

      if(result.status){
          setIsLoading(false)
          const data = result.data.map((val, i) => {
            return {
              ...val,
              id: i + 1,
            };
          });
          setRows(data)
          console.log(result.data)
      }
  }
    const deleteSubcategory=async(row)=>{
        const result=await HttpClient.requestData(`delete-Subcategory/${row._id}`,'PUT')
        
        if(result.status){
          toast.success(result.message)
          setCount((prev)=>++prev)
        }
    }

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
          field: "name",
          headerName: "Name",
          width: 150,
          editable: true,
        },
        {
          field: "img",
          headerName: "Image",
          width: 150,
          height:250,
          editable: true,
          renderCell:params=> <img style={{width:'100px',height:'160px'}} src={params.value}/>
        },
        {
          field: "desc",
          headerName: "Description",
          width: 260,
          editable: true,
        },
        {
            field:"catID",
            headerName:"Category Id",
            width:200,
            editable:true
        },
        {
          field:"actions",
          headerName:"actions",
          width:200,
          renderCell:params=><Box>
          <Button variant="contained" sx={{color:'white',backgroundColor:'red'}} 
              onClick={()=>{
                console.log(params.row,"params")
                editSubCategory(params.row)
              }} color="primary">Edit</Button>
          <Button variant="contained" onClick={()=>deleteSubcategory(params.row)} 
              color="primary">Delete</Button>
        </Box>
        }
    ]
    

    useEffect(()=>{
      fetchSubCategoryData()
    },[count])

  return (
    <Box sx={{ height: 400, width: "96%", margin: "100px"}}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        loading={isLoading}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </Box>
  )
}

export default SubCatTable