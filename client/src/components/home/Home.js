// components
import { useEffect, useState } from "react";
import { getProducts } from "../../service/api";
import CatogorySlider from "../product/CatogorySlider";
import CatogoryNavbar from "./CatogoryNavbar";
import Slider from "./Slider";


const Home = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProductsFromBackend = async () => {
            const data = await getProducts();
            setProducts(data.data);
        };

        getProductsFromBackend();
    }, []);


    return (
        <>
            <CatogoryNavbar />
            <Slider />
            <CatogorySlider products={products} heading={"Top Deals on Fashion"} category={"fashion"} />
            <CatogorySlider products={products} heading={"Bestselling Furniture"} category={"furniture"} />
            <CatogorySlider products={products} heading={"Top Deals on Electronics"} category={"electronics"} />
        </>
    )
}

export default Home