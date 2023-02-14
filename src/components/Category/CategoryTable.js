import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import HttpClient from 'utils/HttpClient';
import { useEffect } from 'react';
import { useState } from 'react';



// const rows = [];


export default function CategoryTable() {
  const [rows,setRows]=useState([])
  const [pageSize, setPageSize] = React.useState(5);
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
    {
      field: 'img',
      headerName: 'Image',
      width: 150,
      editable: true,
    },
    {
      field: 'desc',
      headerName: 'Description',
      width: 110,
      editable: true,
    },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
  ];
 
  const fetchTableData=async()=>{
    const result=await HttpClient.requestData('get-category','GET',{})
    if(result.status){
      const data = result.data.map((val,i)=>{
        return {
          ...val,
          id:i+1
        }
      }) 
      setRows(data)   
      console.log(result.data) 
    }
  }
  useEffect(()=>{
    fetchTableData()
  },[rows])
  return (
    <Box sx={{ height: 400, width: '100%',marginTop:'100px' }}>
         <DataGrid
             rows={rows}
             columns={columns}
             pageSize={pageSize}
             onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
             rowsPerPageOptions={[5, 10, 20]}
             checkboxSelection
             disableSelectionOnClick
             experimentalFeatures={{ newEditingApi: true }}
             components={{
               Toolbar:GridToolbar
             }}
           />
    </Box>
  );
}