import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(255, 255, 255,0.0),rgba(255, 255, 255,0.0)),
    url("https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZCUyMHJlZ2lzdHJhdGlvbiUyMHBpY3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60") center;
    display: flex;    
    align-items: center;
    justify-content: center;
    background-size: cover;

`;
const Wrapper = styled.div`
    width: 40%;
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
 flex-wrap: wrap;
`;
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    font-weight: 600;
    margin: 20px 20px 0px 0px;
    padding: 10px;
`;
const Agreement = styled.span`
    font-size: 15px;
    margin: 20px 0px;
    font-weight: 600;
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
`;

const Register = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Create An Account </Title>
        <Form>
          <Input placeholder="First Name" />
          <Input placeholder="Last Name" />
          <Input placeholder="User Name" />
          <Input placeholder="Email" />
          <Input placeholder="password" />
          <Input placeholder="Confirm password" />
          <Agreement>
            By creating an account , I consent to the processing of my personal
            data in accordance with the <b> PRIVACY POLICY</b>
          </Agreement>
          <Button>Create Now</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
