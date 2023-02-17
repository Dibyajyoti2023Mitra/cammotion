import { useTheme } from '@emotion/react'
import { Button, FormControl, FormHelperText, Input, MenuItem, Select, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import HttpClient from 'utils/HttpClient'
import ProductTable from './ProductTable'



function Products({count,setCount}) {
  const location=useLocation()
  const [category,setCategory]=useState([])
  const [subCategory,setSubCategory]=useState([])
  const [subsubCategory,setSubSubCategory]=useState([])
  const [submitValues,setSubmitValues]=useState({
    catID:location.state ? location.state.catID : "",
    name:location.state ? location.state.name : "",
    img:location.state ? location.state.img : "",
    desc:location.state ? location.state.desc : "",
    subCatID:location.state? location.state.subCatID : "",
    subSubCatID:location.state ? location.state.subSubCatID : "",
    price:"",
    slug:""
  })
  const [error,setError]=useState({})
  const theme=useTheme()
  const navigate=useNavigate()

  // console.log(location.state,"location.state")
  const clickHandler=async(e)=>{
    e.preventDefault()
    setError(validate())
    if(location.state){
        // const result=await HttpClient.requestData(`update-subcategory/${}`)
        console.log("edit Subcategorypage")
        const result=await HttpClient.requestData(`update-product/${location.state._id}`,'PUT',submitValues)
        if(result.status){
            toast.success(result.message)
            // location.status={}
            setTimeout(()=>{
                 navigate('/products')
            },1000)
        }
    }
    else{
      if(Object.entries(validate()).length===0){
         const result=await HttpClient.requestData('add-product','POST',submitValues)
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
    if(!submitValues.subCatID) obj.subCatIDerr=true
    if(!submitValues.subSubCatID) obj.subSubCatIDerr=true
    if(!submitValues.price)  obj.priceerr=true
    if(!submitValues.slug)  obj.slugerr=true
    return obj
  }
  
  const selectCategory=e=>setSubmitValues({...submitValues,catID:e.target.value})
  const selectSubCategory=e=>setSubmitValues({...submitValues,subCatID:e.target.value})
  const selectSSCategory=e=>setSubmitValues({...submitValues,subSubCatID:e.target.value})

   const fetchImgUrl=async(img)=>{
    const data=new FormData()
    data.append('image',img)
    console.log('dddd',data)
    const res=await HttpClient.fileUplode('upload','POST',data)
    if(res.status){
      // console.log(res)
      setSubmitValues((prev)=>{
        return {
          ...prev,
          img:res.url
        }
      })
    }
   }

  const fetchCategory=async()=>{
    const result=await HttpClient.requestData("get-Category","GET",{})
    // console.log('CategoryresultData', result)
    if(result.status){
      setCategory(result.data)
    }
  }

  
   const fetchSSCategory=async()=>{
    const result=await HttpClient.requestData("get-subSubCategory","GET",{})
    if(result.status){
        setSubSubCategory(result.data)
    }
   }



  const fetchSubCategory=async()=>{
    const result=await HttpClient.requestData("get-subcategory","GET",{})
    if(result.status){
       setSubCategory(result.data)
    }
  }

  useEffect(()=>{
     fetchCategory()
     fetchSubCategory()
     fetchSSCategory()
  },[])


  return (
    <Box>
      <Box sx={{
      display:"flex",
      // async function requestData(url, method, params = null) {
      marginTop:"60px",
      }}>
         <FormControl sx={{gap:"30px",
          margin:"40px",
          padding:"20px"}} fullWidth>
            <h2 style={{fontWeight:'bold',textAlign:'center'}}>
              {location.state ? "Edit Product" : "Add Product"}</h2>
              <TextField  onChange={(e)=>selectCategory(e)}
                select
                defaultValue={submitValues.catID}
                label="category"
                error={error.catIDerr}
                inputProps={{ 'aria-label': 'Without label' }}
                helperText={error.catIDerr ? 'please select a category':''}
                >
               
                 {
                   category.length > 0 && category.map((e,i)=>{
                     return (
                        <MenuItem value={e._id}>{e.name}</MenuItem>
                     )
                  })
                 }
                 </TextField>

              <TextField  onChange={(e)=>selectSubCategory(e)}
                select
                defaultValue={submitValues.subCatID}
                label="sub category"
                error={error.subCatIDerr}
                inputProps={{ 'aria-label': 'Without label' }}
                helperText={error.subCatIDerr ? 'please select a sub category':''}
                >
               
                 {
                   subCategory.length > 0 && subCategory.map((e,i)=>{
                   // console.log(e)
                   return (
                      <MenuItem value={e._id}>{e.name}</MenuItem>
                   )
                  })
                 }
               </TextField>
              <TextField  onChange={(e)=>selectSSCategory(e)}
                select
                defaultValue={submitValues.subSubCatID}
                label="sub-sub category"
                error={error.subSubCatIDerr}
                inputProps={{ 'aria-label': 'Without label' }}
                helperText={error.subSubCatIDerr ? 'please select a sub-sub category':''}
                >
               
                 {
                   subsubCategory.length > 0 && subsubCategory.map((e,i)=>{
                //    console.log(e)
                   return (
                    <MenuItem value={e._id}>{e.name}</MenuItem>
                   )
                  })
                 }
              </TextField>
              {/* {location.state ?"Edit Sub-category" :"Add Sub-category"}</h2> */}
            <TextField id="my-input" label='Product Name' aria-describedby="my-helper-text"
            value={submitValues.name}
             onChange={e=>setSubmitValues((prev)=>{
              return {
                ...prev,
                name:e.target.value
              }
             })}
             error={error.nameerr}
             helperText={error.nameerr ? 'please provide a product name':''}
             />
            <Box>
               <Input type='file' 
                 onChange={e=>{fetchImgUrl(e.target.files[0])}}
                 variant='standard' />
               {submitValues.img && (
                   <img src={submitValues.img} width="100" height="100" />
               )}
            </Box>

            <TextField id="my-input" label='Product Price' aria-describedby="my-helper-text"
             value={submitValues.price}
             onChange={e=>setSubmitValues((prev)=>{
              return {
                ...prev,
                price:e.target.value
              }
             })}
             error={error.priceerr}
             helperText={error.priceerr ? 'please provide a product price':''}
             />

            <TextField id="my-input" label='Product Slug' aria-describedby="my-helper-text"
             value={submitValues.slug}
             onChange={e=>setSubmitValues((prev)=>{
              return {
                ...prev,
                slug:e.target.value
              }
             })}
             error={error.slugerr}
             helperText={error.slugerr ? 'please provide a product slug':''}
             />
          {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
            <TextField
              label='Product Description'
              value={submitValues.desc}
              onChange={e=>setSubmitValues(prev=>{
                return {
                  ...prev,
                  desc:e.target.value
                }
              })}
              error={error.descerr}
              helperText={error.descerr ? 'please provide a product description':''}
              maxrows={20} 
              multiline/>
            <Button variant='contained' onClick={e=>clickHandler(e)}>{location.state ? "Edit" : "Add"}</Button>
         </FormControl>
      </Box>
       
     { !location.state && <Box height="90vh"
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
           <ProductTable count={count} setCount={setCount}/>
        </Box>
     }

      </Box>
  )
}

export default Products