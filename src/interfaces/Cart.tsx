import Product from "./Product";

export default interface Cart {
    userId: number;
    products: Product[];
    active: boolean;
    id?: number;
}