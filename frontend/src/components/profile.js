import { Button, Callout, FormGroup, InputGroup } from "@blueprintjs/core"
import React, { useContext, useState, useEffect } from "react"
import axios, { AxiosResponse } from 'axios';
import { UserContext } from "../context/UserContext"


const Profile = () => {
  const [name, setName] = useState("")
  const [mobile, setMobile] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userContext, setUserContext] = useContext(UserContext)

  const userID = localStorage.getItem('userID');
//   console.log(userID)

  const [data,setData] = useState([])

    axios.interceptors.request.use(
        config=>{
            config.headers.Authorization = `Bearer ${localStorage.getItem("userJWT")}`;
            return config;
        },
        error=>{
            console.log(error)
        }
    )
  
    useEffect(() => {
        // fetch(`http://localhost:3000/user?id=${userID}`)
        // .then(resp => resp.json())
        // .then(resp => {
        //     setData(resp)
        //     console.log(resp)
        // })
        axios.get("http://localhost:3000/user/find",{params:{id: userID}})
        .then(res => {
            setData(res.data)
            console.log(res)
        })
    }, [])

  const handleSubmit = event => {
    event.preventDefault();

    axios.put("http://localhost:3000/user/edit", { "name":name,"mobile":mobile,"email":email,"password":password },{params:{id: userID}})
      .then(res => {
        console.log(res);
      })
  }

  return (
    <>
    <div className="profileForm">
    <h3>Profile</h3>
      <form className="auth-form" onSubmit={handleSubmit}>
      <FormGroup label="Name" labelFor="name">
          <InputGroup
            id="name"
            type="text"
            placeholder={data.name}
            onChange={e => setName(e.target.value)}
            value={name}
          />
        </FormGroup>
        <FormGroup label="mobile" labelFor="mobile">
          <InputGroup
            id="mobile"
            type="mobile"
            placeholder={data.mobile}
            onChange={e => setMobile(e.target.value)}
            value={mobile}
          />
        </FormGroup>
        <FormGroup label="Email" labelFor="email">
          <InputGroup
            id="email"
            type="email"
            placeholder={data.email}
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </FormGroup>
        <FormGroup label="Password" labelFor="password">
          <InputGroup
            id="password"
            placeholder="Enter a new password"
            type="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </FormGroup>
        <Button intent="primary" text="Update" fill type="submit" />
      </form>
      </div>
    </>
  )
}

export default Profile
