import { FunctionComponent, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { addNewProduct } from "../services/productsService";
import { successMsg } from "../services/feedbackService";
import { useNavigate } from "react-router-dom";

interface AddProductProps {

}

const AddProduct: FunctionComponent<AddProductProps> = () => {
    let navigate = useNavigate();
    useEffect(() => {
        formik.setFieldValue("price", "")
    }, []);
    let formik = useFormik({
        initialValues: { name: "", price: 0, category: "", description: "", image: "" },
        validationSchema: yup.object({
            name: yup.string().required().min(2),
            price: yup.number().required().min(0),
            category: yup.string().required().min(0),
            description: yup.string().required().min(2),
            image: yup.string()

        }),
        onSubmit: (values) => {
            addNewProduct({ ...values })
                .then((res) => {
                    sessionStorage.setItem("userName", values.name);
                    sessionStorage.setItem("isLoggedIn", "true");
                    sessionStorage.setItem("isAdmin", "true");
                    navigate("/products");
                    successMsg("Added successfully")
                })

        }

    }
    )

    return (<>

        <form className="mb-3" onSubmit={formik.handleSubmit}>
            <h3 className="display-3">Add New Product</h3>
            <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    id="floatingName"
                    placeholder="Name"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                />

                <label htmlFor="floatingName">Name</label>
                {formik.touched.name && formik.errors.name && (
                    <p className="text-danger">{formik.errors.name}</p>
                )}
            </div>
            <div className="form-floating mb-3">
                <input
                    type="number"
                    className="form-control"
                    id="floatingPrice"
                    placeholder="Price"
                    name="price"
                    onChange={formik.handleChange}
                    value={formik.values.price}
                    onBlur={formik.handleBlur}
                />

                <label htmlFor="floatingName">Price</label>
                {formik.touched.price && formik.errors.price && (
                    <p className="text-danger">{formik.errors.price}</p>
                )}
            </div>
            <div className="form-floating mb-3">
                <select className="form-select" aria-label="Default select example" name="category"
                    onChange={formik.handleChange}
                    value={formik.values.category}
                    onBlur={formik.handleBlur}>
                    <option selected>Category</option>
                    <option value="Laptop">Laptop</option>
                    <option value="PC">PC</option>
                    <option value="Naushniki">Naushniki</option>
                    <option value="Phone">Phone</option>
                </select>
                {/* <input
                    type="text"
                    className="form-control"
                    id="floatingCategory"
                    placeholder="Category"
                    name="category"
                    onChange={formik.handleChange}
                    value={formik.values.category}
                    onBlur={formik.handleBlur}
                /> */}

                <label htmlFor="floatingName">Category</label>
                {formik.touched.category && formik.errors.category && (
                    <p className="text-danger">{formik.errors.category}</p>
                )}
            </div>
            <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    id="floatingDescription"
                    placeholder="Description"
                    name="description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    onBlur={formik.handleBlur}
                />

                <label htmlFor="floatingName">Description</label>
                {formik.touched.description && formik.errors.description && (
                    <p className="text-danger">{formik.errors.description}</p>
                )}
            </div>
            <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    id="floatingImage"
                    placeholder="Image"
                    name="image"
                    onChange={formik.handleChange}
                    value={formik.values.image}
                    onBlur={formik.handleBlur}
                />

                <label htmlFor="floatingName">Image</label>
                {formik.touched.image && formik.errors.image && (
                    <p className="text-danger">{formik.errors.image}</p>
                )}
            </div>
            <button type="submit" className="btn btn-success mt-3" disabled={!formik.isValid || !formik.dirty}>Add</button>
        </form>

    </>);
}

export default AddProduct;