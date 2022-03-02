import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import {mobile } from '../responsive'


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(255, 255, 255,0.0),rgba(255, 255, 255,0.0)),
    url("https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8YmFja2dyb3VuZCUyMGxvZ2luJTIwcGljfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60") center;
    display: flex;    
    align-items: center;
    justify-content: center;
    background-size: cover;

`;
const Wrapper = styled.div`
    width: 30%;
    padding: 20px;
    background-color: white;
    border-radius: 2%;
    ${mobile({ width: "75%"})}
`;
const Title = styled.h1`
    font-size: 24px;
    font-weight: 600;
`;
const Form = styled.form`
 display: flex;
 flex-direction: column;
`;
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    font-weight: 600;
    margin: 15px 0px;
    padding: 10px;
`;

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    font-weight: 600;
    border-radius: 5%;
    margin-bottom: 10px;
    &:disabled{
      color: 'grey';
      cursor: not-allowed;
    }
`;
const Error = styled.span`
  color: red;
`

const Link = styled.a`
    margin: 5px 0px;
    font-size: 15px;
    cursor: pointer;
    font-weight: 600;
    
`;


const Login = () => {
  const [username,setUserName] = useState('')
  const [password,setPassword] = useState('')
  const dispatch = useDispatch()

  const {isFetching,error} = useSelector((state)=> state.user)

 const handleClick = (e)=>{
   e.preventDefault()
   login(dispatch, { username, password });
 }

  return (
    <Container>
      <Wrapper>
        <Title>Sign In </Title>
        <Form>
          <Input placeholder="User Name" onChange={(e)=> setUserName(e.target.value)} />
          <Input placeholder="Password" onChange={(e)=> setPassword(e.target.value)}/>
          <Button onClick={handleClick} disabled={isFetching}>Log In</Button>
          {error&&<Error >Something Went Wrong...</Error>}
          <Link>FORGOT PASSWORD ?</Link>
          <Link>Already have an Account ?</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
