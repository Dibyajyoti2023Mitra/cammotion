import { Visibility, VisibilityOff} from '@mui/icons-material'
import { Box,TextField,Button, Card, CardContent, InputAdornment, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { reactLocalStorage } from 'reactjs-localstorage'
import HttpClient from 'utils/HttpClient'

function Login() {

    // useEffect(()=>{
    //   // reactLocalStorage.setObject("user",{name:"shivam"})
    //   // localStorage.setItem("data",true)
    //   if(reactLocalStorage.get('admintoken')) navigate('dashboard',{replace:true})
    // },[isSet])
    const navigate=useNavigate()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    // const [isSet,setIsSet]=useState(false)
    const [error,setError]=useState({})
    const [showPassword,setShowPassWord]=useState(false)
    const r=/^([\-\.0-9a-zA-Z]+)@([\-\.0-9a-zA-Z]+)\.([a-zA-Z]){1,7}$/
    const clickHandler=async()=>{
        setError(validate())
        console.log('validate',validate())
        email && !r.test(email) && alert('enter valid email address')
        const data={
          email:email,
          password:password
        }
        // if(!Object.entries(validate())){
        // setError(validate())
        const result=await HttpClient.requestData('login','POST',data)
        console.log(result)
        if(result && result.status){
           console.log(result.data)
           reactLocalStorage.setObject("admintoken",{token:result.data})
           toast.success(result.message)
           setTimeout(()=>navigate('/dashboard'),1000)
        }else{
           toast.error('login failed ... try again')
        }
        console.log(result)
      // }
    }
    const validate=()=>{
        const obj={}
        if(!email) obj.emailErr='please provide an email'
        if(!password) obj.passwordErr='please provide a passowrd'
        return obj
    }
    const handleClickShow=()=>setShowPassWord(prevPassord=>!prevPassord)
    const handleMouseDownShow=()=>setShowPassWord(prevPassord=>!prevPassord)
  return (
    <Box component='div' sx={{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    }}>
     <Card>
        <CardContent sx={{
            display:'flex',
            width:'40vw',
            height:'70vh',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            gap:'10%'
        }}>
           {/* <Typography Variant="h5">Login</Typography>  */}
          <h1 style={{fontWeight:'bold'}}>Log in</h1>
          <TextField sx={{width:'50%'}} type='text' label='Email' variant='outlined' 
          helperText={error.emailErr} onChange={e=>setEmail(e.target.value)}/>
          <TextField sx={{width:'50%'}} type={showPassword ? 'text':'password'} label='Password' 
          variant='outlined' helperText={error.passwordErr} onChange={e=>setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShow}
                  onMouseDown={handleMouseDownShow}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}/>
          <Button sx={{width:'50%'}} variant='contained' 
          onClick={clickHandler}>Login</Button>
        </CardContent>
     </Card>
    </Box>
  )
}

export default Login
