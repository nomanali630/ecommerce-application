import React from 'react'
import Annoucement from '../components/Annoucement'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'
import Categories from '../components/Categories'
import Products from '../components/Products'
import NewsLetter from '../components/Newsletter'
import Footer from '../components/Footer'
    

const Home = () => {
    return (
        <div>
         < Navbar />
         <Annoucement/>
         <Slider/>
         <Categories/>
         <Products/>
         <NewsLetter/>
         <Footer/>
        </div>
    )
}

export default Home
