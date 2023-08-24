import axios from "axios";
import Product from "../interfaces/Product";
import Cart from "../interfaces/Cart";

let api: string = `${process.env.REACT_APP_API}/carts`;

// get cart by userId
export function getCart(userId: number) {
    return axios.get(`${api}?userId=${userId}&active=true`)
}

// create cart
export function createCart(userId: number) {
    return axios.post(api, { userId, products: [], active: true })
}

// add to cart / update cart
export async function addToCart(userId: number, productToAdd: Product) {
    try {
        // 1. search for the exising cart products
        let res = await getCart(userId);
        // 2. add the new product to the products array
        res.data[0].products.push(productToAdd);
        // 3. update the cart - put or patch
        return axios.patch(`${api}/${userId}`, {
            products: res.data[0].products,
        });
    } catch (error) {
        console.log(error);
    }
}