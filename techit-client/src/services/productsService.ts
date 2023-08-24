import Product from "../interfaces/Product";
import axios from "axios"

let api: string = `${process.env.REACT_APP_API}/products`;

export function getProducts() {
    return axios.get(api, { headers: { Authorization: JSON.parse(sessionStorage.getIsstem("token") as string) } });
}

export function getProductbyId(id: number) {
    return axios.get(`${api}/${id}`);
}

export function addNewProduct(newProduct: Product) {
    return axios.post(api, newProduct);
}

export function editProduct(editedProduct: Product, id: number) {
    return axios.put(`${api}/${id}`, editedProduct);
}


export function deleteProduct(id: number) {
    return axios.delete(`${api}/${id}`);
}
