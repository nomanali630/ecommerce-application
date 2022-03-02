import { Add, Remove } from "@material-ui/icons";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Annoucement from "../components/Annoucement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout"
import { useEffect, useState } from "react";
import {userRequest} from "../requestMethod"
import { useHistory } from "react-router";

// const KEY = process.env.REACT_STRIPE_KEY
const KEY = "pk_test_51Jh84sKTXEh7w1yeZ1AlILdYtIkeYPsbuTGSvv7PJ0l6hROJLqU9MqC12niGVPdIMbEu5I9i5yj90rKT5KsF6tRa00D1RKa4xz"

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px"})}
`;
const Title = styled.h1`
  font-weight: 600;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 5%;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;
const TopTexts = styled.div`
  ${mobile({ display: "none"})}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 5px;
  font-weight: 600;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column"})}
`;
const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-around;
  ${mobile({ flexDirection: "column"})}
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 200px;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ProductName = styled.span``;
const ProductID = styled.span``;
const ProductColor = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
const ProductSize = styled.span``;
const ProductPriceContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const ProductAmount = styled.div`
  font-size: 25px;
  margin: 5px;
  ${mobile({ margin: "5px 15px"})}
`;
const ProductPrice = styled.div`
  font-weight: 500;
  font-size: 30px;
  ${mobile({ marginBottom: "20px"})}
`;

const Summery = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;
const SummeryTitle = styled.h1`

`;
const SummeryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: ${(props)=>props.type === "total" && "30px"};
`;
const SummeryItemText = styled.span``;
const SummeryItemPrice = styled.span``;
const SummeryButton = styled.button`
   width: 100%;
   padding: 10px;
   background-color: black;
   color: white;
   font-weight: 600;
   border-radius: 10px;
`;

const Cart = () => {

  const cart = useSelector(state=>state.cart)
  
  const[stripeToken, setStripeToken] = useState(null)
  const history =  useHistory()
  const onToken = (token) =>{
    setStripeToken(token)
  }
  useEffect(()=>{
    const makeRequest = async () =>{
      try {
        const res = await userRequest.post("/checkout/payment",{
          tokenID: stripeToken.id,
          amount: 500,
        });
        history.push('/success',{data:res.data})
      } catch (error) {
        console.log("unable to make payment request",error)
      }
    }
    stripeToken && makeRequest();
  },[stripeToken,cart.total,history])

 console.log('cart:',cart)

  return (
    <Container>
      <Navbar />
      <Annoucement />
      <Wrapper>
        <Title>BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>

          <TopTexts>
            <TopText>Shopping bag(0)</TopText>
            <TopText>Your WishList(0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map(product=>(
            <Product>
              <ProductDetail>
                <Image src={product.img} />
                <Details>
                  <ProductName>
                    <b>Product :</b> {product.title}
                  </ProductName>
                  <ProductID>
                    <b>ID :</b> {product._id}
                  </ProductID>
                 

                  <ProductColor color={product.color} />
                 
                  <ProductSize>
                    <b>Size :</b> {product.size}
                  </ProductSize>
                </Details>
              </ProductDetail>
              <ProductPriceContainer>
                <ProductAmountContainer>
                    <Add/>
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove/>
                </ProductAmountContainer>
                <ProductPrice>$ {product.price*product.quantity}</ProductPrice>
              </ProductPriceContainer>
              
            </Product>
            
            ))}
          </Info>
          <Summery>
            <SummeryTitle>Order Summery</SummeryTitle>
            <SummeryItem>
              <SummeryItemText>Subtotal</SummeryItemText>
              <SummeryItemPrice>$ {cart.total}</SummeryItemPrice>
            </SummeryItem>
            <SummeryItem>
              <SummeryItemText>Estimated Shipping</SummeryItemText>
              <SummeryItemPrice>$ 67</SummeryItemPrice>
            </SummeryItem>
            <SummeryItem>
              <SummeryItemText>Shipping Discount</SummeryItemText>
              <SummeryItemPrice>$ -67</SummeryItemPrice>
            </SummeryItem>
            <SummeryItem type="total">
              <SummeryItemText >Total</SummeryItemText>
              <SummeryItemPrice>$ {cart.total}</SummeryItemPrice>
            </SummeryItem>
            <StripeCheckout
              name="Lama Shop"
              image="https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
            <SummeryButton>CHECKOUT NOW</SummeryButton>
            </StripeCheckout>


          </Summery>
        </Bottom>
        <hr style={{margin:"10px"}}/>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
