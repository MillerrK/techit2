import { FunctionComponent, useEffect, useState } from "react";
import NavBar from "./NavBar";
import Product from "../interfaces/Product";
import { deleteProduct, getProducts } from "../services/productsService";
import { Link } from "react-router-dom";
import { successMsg } from "../services/feedbackService";
import { addToCart } from "../services/cartsService";


interface ProductsProps {

}

const Products: FunctionComponent<ProductsProps> = () => {
    let [products, setProducts] = useState<Product[]>([]);
    let [productsChanged, setProductsChanged] = useState<boolean>(false)

    useEffect(() => {
        getProducts()
            .then((res) => setProducts(res.data))

            .catch((err) => console.log(err));
    }, [productsChanged]);

    let handleDelete = (id: number) => {
        if (window.confirm("Are you sure?")) {
            deleteProduct(id)
                .then((res) => {
                    setProductsChanged(!productsChanged);
                    successMsg("Product deleted successfully!");
                })
                .catch((err) => console.log(err));
        }
    };
    let handleAddToCart = (product: Product) => {
        let userId = JSON.parse(sessionStorage.getItem("userId") as string);
        addToCart(userId, product)
            .then((res) => successMsg("Product added to cart"))
            .catch((err) => console.log(err))
    }

    return (<>
        {sessionStorage.getItem("isAdmin") == "true" && (<Link to="add-product" className="btn btn-success">
            Add Product
        </Link>)}

        {products.length ? (

            <div className="container">
                <div className="row">
                    {products.map((product: Product) =>
                        <div key={product._id} className="card col-md-4 mx-2" style={{ width: "20rem" }}>
                            <img className="card-img-top" src={product.image} alt={product.name} style={{ width: "16.5rem", height: "16.5rem" }}></img>
                            <div className="card-body">
                                <p className="card-subtitle mb-2 text-muted">{product.category}</p>
                                <h3 className="card-title">{product.name}</h3>
                                <p className="card-text">{product.description}</p>
                                <p className="card-text text-success">{product.price}₪</p>


                                {sessionStorage.getItem("isAdmin") == "true" ?
                                    (
                                        <div className="d-flex">
                                            <button className="btn btn-primary text-light m-1"
                                                onClick={() =>
                                                    handleAddToCart(product)}><i className="fa-solid fa-cart-plus"></i> Add to Cart</ button>
                                            <Link to={`update/${product._id}`} className="btn btn-warning text-light m-1"><i className="fa-solid fa-pen-to-square"></i></Link>
                                            <Link to={""} className="btn btn-danger text-light m-1" onClick={() => handleDelete(product._id as number)}><i className="fa-solid fa-trash"></i></Link>
                                        </div>
                                    )
                                    : (<button className="btn btn-primary text-light m-1" onClick={() =>
                                        handleAddToCart(product)}><i className="fa-solid fa-cart-plus"></i> Add to Cart</button>)}


                            </div>
                        </div >)
                    }
                </div>
            </div>
        ) : (<p>No</p>)}


    </>);
}

export default Products;