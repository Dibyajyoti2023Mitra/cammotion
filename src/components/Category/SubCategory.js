import React from 'react'
import HttpClient from 'utils/HttpClient'

function SubCategory() {
    const [pageSize,setPageSize]=useState(5)
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
            field:"catID",
            headerName:"Category Id",
            width:150,
            editable:true
        }
    ]
    const getSubCategory=async()=>{
        const result=await HttpClient.requestData("add-subcategory","POST",{})
        if(result.status){
            console.log(result.data)
        }
    }
  return (
    <div>
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
    </div>
  )
}

export default SubCategory