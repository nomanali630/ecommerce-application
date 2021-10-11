import { Add, Remove } from "@material-ui/icons";
import { useLocation } from "react-router";
import styled from "styled-components";
import Annoucement from "../components/Annoucement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/Newsletter";
import { mobile } from "../responsive";
import { publicRequest } from "../requestMethod";
import { useEffect, useState } from "react";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const Container = styled.div``;
const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    ${mobile({ padding: "10px", flexDirection:"column"})}
`;
const ImgContainer = styled.div`
     flex: 1;
`;
const Image = styled.img`
   width: 100%;
   height: 90vh;
   object-fit: cover;
   ${mobile({ height: "40vh"})}
`;
const InfoContainer = styled.div`
     flex: 1;
     padding: 0px 50px;
     ${mobile({ padding: "10px"})}
`;
const Title = styled.h1`
    font-weight: 600;
`;
const Desc = styled.p`
    padding: 20px 0px;
`;
const Price = styled.span`
    font-weight: 600;
    font-size: 30px;
`;
const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    ${mobile({ width: "100%"})}
`;
const Filter = styled.div`
    display: flex;
    align-items: center;
`;
const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 600;
`;
const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props=>props.color};
    margin: 0px 5px;
    cursor: pointer;
`;
const FilterSize = styled.select`
    margin-left: 5px;
    padding: 5px;
`;
const FilterSizeOption = styled.option`

`;
const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ width: "100%"})}

`;
const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 900;
`;
const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`;
const Button = styled.button`
    padding: 15px;
    border: 2px solid heal;
    background-color: white;
    cursor: pointer;
    font-weight: 600;
    border-radius: 10px;

    &:hover{
        background-color: #f8f4f4;
    }
`;

const SingleProduct = () => {
    const location = useLocation();
    const ID = location.pathname.split("/")[2]
    const [singleProduct,setSingleProduct] = useState({}) 
    const [quantity,setQuantity] = useState(1) 
    const [color,setColor] = useState("") 
    const [size,setSize] = useState("")
    const dispatch = useDispatch();
    
    useEffect(() => {
        const getProduct = async () =>{
            try {
                const res = await publicRequest.get(`/products/find/${ID}`)
                setSingleProduct(res.data)
            } catch (error) {
                console.log("error fetching single product",error)
            }
        }       
        getProduct();
    }, [ID]);
    const handleQuantity = (type)=>{
        if(type === "dec"){
          quantity > 1 && setQuantity(quantity - 1)
        }else{
            setQuantity(quantity + 1)
        }
    }
        const handleClick = ()=>{
            dispatch(
                addProduct({ ...singleProduct , quantity , size , color })
            )
        }
 console.log("size:",size);

  return (
    <Container>
      <Navbar />
      <Annoucement />
      <Wrapper>
        <ImgContainer>
          <Image src={singleProduct.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{singleProduct.title}</Title>
          <Desc>{singleProduct.desc}</Desc>
          <Price>$ {singleProduct.price}</Price>
          <FilterContainer>
              <Filter>
                  <FilterTitle>Color</FilterTitle>
                                  
                 {singleProduct.color?.map((v,i)=>{
                     return(
                          <FilterColor color={v} key={i} onClick={()=>setColor(v)} /> 

                     )
                 })}
                     
              </Filter>
              <Filter>
                    <FilterTitle>Size</FilterTitle>
                    <FilterSize onChange={(e)=>setSize(e.target.value)}>     
                        {singleProduct.size?.map((v,i)=>{
                            return(
                                <FilterSizeOption key={i} >{v}</FilterSizeOption>

                            )
                        })}
                        
                    </FilterSize>
              </Filter>
          </FilterContainer>
          <AddContainer>
              <AmountContainer>
                  <Remove onClick={()=>handleQuantity("dec")} />
                  <Amount>{quantity}</Amount>
                  <Add onClick={()=>handleQuantity("inc")} />
              </AmountContainer>
              <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <NewsLetter />
      <Footer />
    </Container>
  );
};

export default SingleProduct;
