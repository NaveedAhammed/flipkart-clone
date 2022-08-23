import { Box, InputBase, List, ListItem } from '@mui/material';
import styled from '@emotion/styled';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { getProducts } from '../../service/api';
import { Link } from 'react-router-dom';

const SearchContainer = styled(Box)`
    background: #fff;
    width: 38%;
    border-radius: 2px;
    margin-left: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
`;

const InputSearchContainer = styled(InputBase)`
    padding-left: 20px;
    width: 100%;
    font-size: unset;
`;

const SearchIconWrapper = styled(Box)`
    color: blue;
    padding: 5px;
    display: flex;
`;

const ListWrapper = styled(List)`
    position: absolute;
    background-color: white;
    color: black;
    top: 0;
    left: 0;
    right: 0;
    margin-top: 36px;
`;

const Search = () => {

    const [search, setSearch] = useState("");
    const [products, setProducts] = useState("");

    useEffect(() => {
        const getProductsFromBackend = async () => {
            const data = await getProducts();
            setProducts(data.data);
        };

        getProductsFromBackend();
    }, []);

    const searchHandler = (event) => {
        setSearch(event.target.value);
    }

    return (
        <SearchContainer>
            <InputSearchContainer
                placeholder='Search for products, brands and more'
                onChange={searchHandler}
                value={search}
            />
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            {
                search &&
                <ListWrapper>
                    {
                        products.filter(product => product.title.toLowerCase().includes(search.toLowerCase())).map(product => (
                            <ListItem key={product._id} style={{ fontSize: 14, margin: '5px', borderBottom: '1px solid lightgray' }}>
                                <Link
                                    to={`product/${product._id}`}
                                    onClick={() => { setSearch("") }}
                                >
                                    {product.title.slice(0, 100)}...
                                </Link>
                            </ListItem>
                        ))
                    }
                </ListWrapper>
            }
        </SearchContainer>
    )
}

export default Search