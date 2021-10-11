import { Email, Facebook, Instagram, Phone, Pinterest, Room, Twitter } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column"})}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const Logo = styled.h1`

`;
const Desc = styled.p`
 margin: 20px 0px;
`;
const SocialContainer = styled.div`
 display: flex;
`;
const SocailIcon = styled.div`
 width: 40px;
 height: 40px;
 border-radius: 50%;
 color: white;
 background-color: #${props=> props.color};
 display: flex;
 align-items: center;
 justify-content: center;
 margin-right: 20px;
`;


const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none"})}
`;
const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8"})}
`;
const Title = styled.h3`
 margin-bottom: 30px;

`;
const List  = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`;
const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
`;
 const COntactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    
 `;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>LAMA.</Logo>
        <Desc>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
          culpa quas ullam! Nesciunt, enim vel officia autem, magni quae debitis
          eaque eveniet beatae nostrum accusamus deserunt sunt nemo quam porro!
        </Desc>
        <SocialContainer>
            <SocailIcon color='3B5999'>
                <Facebook/>
            </SocailIcon>
            <SocailIcon color='E4405F'>
                <Instagram/>
            </SocailIcon>
            <SocailIcon color='55ACEE'>
                <Twitter/>
            </SocailIcon>
            <SocailIcon color='E60023'>
                <Pinterest/>
            </SocailIcon>
        </SocialContainer>
      </Left>
      <Center>
          <Title>Useful Links</Title>
          <List>
              <ListItem>Home</ListItem>
              <ListItem>Cart</ListItem>
              <ListItem>Man Fashion</ListItem>
              <ListItem>Women Fashion</ListItem>
              <ListItem>Accessories</ListItem>
              <ListItem>My Account</ListItem>
              <ListItem>Order Tracking</ListItem>
              <ListItem>Wishlist</ListItem>
              <ListItem>Terms</ListItem>
              
          </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <COntactItem> <Room style={{marginRight:'10px'}}/> 1735/857 gulshan colony gulshan chowrangi</COntactItem>
        <COntactItem> <Phone style={{marginRight:'10px'}}/> 03123242334</COntactItem>
        <COntactItem> <Email style={{marginRight:'10px'}}/> Contact@gmail.com</COntactItem>
        

      </Right>
    </Container>
  );
};

export default Footer;
