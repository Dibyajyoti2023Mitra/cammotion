import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import HttpClient from "utils/HttpClient";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
// import { Card, CardMedia } from "@mui/material";
// import { Container } from "@mui/system";

// const rows = [];
export default function CategoryTable({count,setCount}){
  const [rows, setRows] = useState([]);
  const navigate=useNavigate()
  const [pageSize, setPageSize] = React.useState(5);
  const [isLoading,setIsLoading]=useState(true)
    
  const editCategory=async(row)=>{
    const route = `/category/${row._id}`
    // console.log(route)
     navigate(route,{state:row})
    //  console.log("something")
    //  const result=await HttpClient.requestData(`edit-category/${row._id}`,'PUT')
    //  if(result.status){
    //     toast.success(result.message)
    //     setTimeout(()=>{
    //       navigate('/category')
    //     },1000)
    //  }
  }

  const deleteCategory=async(row)=>{
    // const obj={...row}
    // const newCategories=rows.filter((e)=>e._id!==row._id)
    const result=await HttpClient.requestData(`delete-category/${row._id}`,'PUT')
    console.log(result)
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
      width: 200,
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
        field: "Actions",
        headerName: "actions",
        width:150,
        renderCell:params=> <Box>
            <Button variant="contained" sx={{color:'white',backgroundColor:'red'}} 
              onClick={()=>editCategory(params.row)} color="primary">Edit</Button>
            <Button variant="contained" onClick={()=>deleteCategory(params.row)} 
              color="primary">Delete</Button>
        </Box>
    }

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

  const fetchTableData = async () => {
    const result = await HttpClient.requestData("get-category", "GET", {});
    if (result.status) {
      setIsLoading(false)
      const data = result.data.map((val, i) => {
        return {
          ...val,
          id: i + 1,
        };
      });
      setRows(data);
      console.log(result.data);
    }
    // else{
    //   setIsLoading(true)
    // }
  };
  useEffect(() => {
    fetchTableData();
  }, [count]);
  return (
    
   
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
  );
}
