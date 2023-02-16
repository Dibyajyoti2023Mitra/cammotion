import { useTheme } from '@emotion/react'
import { FormatTextdirectionLToROutlined } from '@mui/icons-material'
import { Box, Button, FormControl, Input, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import HttpClient from 'utils/HttpClient'



function SubSubCategory({count,setCount}) {
  const location=useLocation()
  const [category,setCategory]=useState([])
  const [submitValues,setSubmitValues]=useState({
    catID:location.state ? location.state.catID : "",
    subCatID:location.state ? location.state.subCatID : "",
    name:location.state ? location.state.name : "",
    img:location.state ? location.state.img : "",
    desc:location.state ? location.state.desc : ""
  })
  const theme=useTheme()
  const navigate=useNavigate()

  const clickHandler=async(e)=>{
      e.preventDefault()
      if(location.state){
          console.log("edit Subcategorypage")
          const result=await HttpClient.requestData(`update-category/${location.state._id}`,'PUT',submitValues)
          if(result.status){
              toast.success(result.message)
              setTimeout(()=>{
                   navigate('/subcategory')
              },1000)
      }
    }
    else{
      const result=await HttpClient.requestData('add-subcategory','POST',submitValues)
      if(result.status){
        // console.log('result', result)
        setCount(count+1)
        toast.success(result.message)
      }
    } 
  }
  
  const selectCategory=e=>setSubmitValues({...submitValues,catID:e.target.value})

   const fetchImgUrl=async(img)=>{
    const data=new FormData()
    data.append('image',img)
    console.log('dddd',data)
    const res=await HttpClient.fileUplode('upload','POST',data)
    if(res.status){
      console.log(res)
      setSubmitValues((prev)=>{
        return {
          ...prev,
          img:res.url
        }
      })
    }
   }

  const fetchCategory=async()=>{
    const result=await HttpClient.requestData('get-Category','GET',{})
    if(result.status){
      // console.log(result)
      setCategory(result.data)
    }
  }

  // const fetchSubCategory=async()=>{
  //   const result=await HttpClient.requestData('get-subcategory','GET',)
  // }

  useEffect(()=>{
     fetchCategory()
  },[])

// useEffect(()=>{
//   console.log(submitValues.catID)
// },[submitValues.catID])

  return (
    <Box>
      <Box sx={{
      display:"flex",
      justifyContent:"center",
      alignContent:"center",
      marginTop:"60px",
      }}>
         <FormControl sx={{gap:"30px",
          margin:"40px",
          padding:"20px"}} fullWidth>
            <h2 style={{fontWeight:'bold',textAlign:'center'}}>
              {location.state ? "Edit Subcategory" : "Add Subcategory"}</h2>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                onChange={(e)=>selectCategory(e)}
                defaultValue={submitValues.catID}
                inputProps={{ 'aria-label': 'Without label' }}>
                 {/* loading.state ? (<MenuItem value={submitValues.catID}></MenuItem>) :*/}
                 <MenuItem value="">
                    <em>None</em>
                 </MenuItem>
                 {
                   category.length > 0 && category.map((e,i)=>{
                   // console.log(e)
                   return (
                      <MenuItem value={e._id}>{e.name}</MenuItem>
                   )
                  })
                 }
              </Select>
            </FormControl>
              {/* {location.state ?"Edit Sub-category" :"Add Sub-category"}</h2> */}
            <TextField id="my-input" label='Sub-category Name' aria-describedby="my-helper-text"
            value={submitValues.name}
             onChange={e=>setSubmitValues((prev)=>{
              return {
                ...prev,
                name:e.target.value
              }
             })}/>
            <Box>
               <Input type='file' 
                 onChange={e=>{fetchImgUrl(e.target.files[0])}}
                 variant='standard' />
               {submitValues.img && (
                   <img src={submitValues.img} width="100" height="100" />
               )}
            </Box>
          {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
            <TextField
              label='Sub-category Description'
              value={submitValues.desc}
              onChange={e=>setSubmitValues(prev=>{
                return {
                  ...prev,
                  desc:e.target.value
                }
              })}
              maxrows={20} multiline/>
            <Button variant='contained' onClick={e=>clickHandler(e)}>{location.state ? "Edit" : "Add"}</Button>
         </FormControl>
      </Box>
      {/* <Box
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
      }}>
          <SubCatTable count={count} setCount={setCount} values={submitValues}/>
      </Box>  */}
    </Box>
  )
}

export default SubSubCategory