import { useTheme } from '@emotion/react'
import { Button, FormControl, FormHelperText, Input, MenuItem, Select, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import HttpClient from 'utils/HttpClient'
import SubCatTable from './SubCatTable'


function SubCategory({count,setCount}) {
  const location=useLocation()
  const [category,setCategory]=useState([])
  const [submitValues,setSubmitValues]=useState({
    catID:location.state ? location.state.catID : "",
    name:location.state ? location.state.name : "",
    img:location.state ? location.state.img : "",
    desc:location.state ? location.state.desc : ""
  })
  const [error,setError]=useState({})
  const theme=useTheme()
  const navigate=useNavigate()

  console.log(location.state,"location.state")
  const clickHandler=async(e)=>{
      e.preventDefault()
      setError(validate())
      if(location.state){
          // const result=await HttpClient.requestData(`update-subcategory/${}`)
          console.log("edit Subcategorypage")
          const result=await HttpClient.requestData(`update-subcategory/${location.state._id}`,'PUT',submitValues)
          if(result.status){
              toast.success(result.message)
              // location.status={}
              setTimeout(()=>{
                   navigate('/subcategory')
              },1000)
      }
    }
    else{
      if(Object.entries(validate()).length===0){
         const result=await HttpClient.requestData('add-subcategory','POST',submitValues)
         if(result.status){
            // console.log('result', result)
            setCount(count+1)
            toast.success(result.message)
         }
      }
    } 
  }


  const validate=()=>{
    const obj={}
    if(!submitValues.name) obj.nameerr=true
    if(!submitValues.img)  obj.imgerr=true
    if(!submitValues.desc) obj.descerr=true
    if(!submitValues.catID) obj.catIDerr=true
    return obj
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
              <TextField  onChange={(e)=>selectCategory(e)}
                select
                defaultValue={submitValues.catID}
                label="category"
                error={error.catIDerr}
                helperText={error.catIDerr ? 'please select a category' : ''}
                inputProps={{ 'aria-label': 'Without label' }}>
                 {/* loading.state ? (<MenuItem value={submitValues.catID}></MenuItem>) :*/}
               
                 {
                   category.length > 0 && category.map((e,i)=>{
                   // console.log(e)
                   return (
                      <MenuItem value={e._id}>{e.name}</MenuItem>
                   )
                  })
                 }
              </TextField>
              <FormHelperText></FormHelperText>
            </FormControl>
              {/* {location.state ?"Edit Sub-category" :"Add Sub-category"}</h2> */}
            <TextField id="my-input" label='Sub-category Name' aria-describedby="my-helper-text"
            value={submitValues.name}
             onChange={e=>setSubmitValues((prev)=>{
              return {
                ...prev,
                name:e.target.value
              }
             })}
             error={error.nameerr}
             helperText={error.nameerr ? 'please provide a name':''}
             />
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
              error={error.descerr}
              helperText={error.descerr ? 'please provide a description':''}
              maxrows={20} 
              multiline/>
            <Button variant='contained' onClick={e=>clickHandler(e)}>{location.state ? "Edit" : "Add"}</Button>
         </FormControl>
      </Box>
      { !location.state && <Box
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
      </Box> 
      }
    </Box>
  )
}

export default SubCategory