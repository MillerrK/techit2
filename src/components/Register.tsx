import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { addNewUser } from "../services/usersService";
import { errorMsg, successMsg } from "../services/feedbackService";
import { createCart } from "../services/cartsService";

interface RegisterProps {

}

const Register: FunctionComponent<RegisterProps> = () => {
    let navigate = useNavigate();
    let formik = useFormik({
        initialValues: { name: "", email: "", password: "" },
        validationSchema: yup.object({
            name: yup.string().required().min(2),
            email: yup.string().required().email(),
            password: yup.string().required().min(8),
        }),
        onSubmit: (values) => {
            addNewUser({ ...values, isAdmin: false })
                .then((res) => {
                    sessionStorage.setItem("token", res.data);
                    // sessionStorage.setItem("userName", values.name);
                    // sessionStorage.setItem("isLoggedIn", "true");
                    // sessionStorage.setItem("isAdmin", "false");
                    console.log(res.data);

                    sessionStorage.setItem("userId", res.data.id);
                    navigate("/home");
                    successMsg("Registrated successfully");
                    // createCart(res.data.id)
                })

        }
    });
    return (<>
        <form className="mb-3" onSubmit={formik.handleSubmit}>
            <h3 className="display-3">REGISTER</h3>
            <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    id="floatingName"
                    placeholder="John Doe"
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
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                />

                <label htmlFor="floatingInput">Email address</label>
                {formik.touched.email && formik.errors.email && (
                    <p className="text-danger">{formik.errors.email}</p>
                )}
            </div>
            <div className="form-floating">
                <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur} />
                <label htmlFor="floatingPassword">Password</label>
                {formik.touched.password && formik.errors.password && (
                    <p className="text-danger">{formik.errors.password}</p>
                )}
            </div>
            <button type="submit" className="btn btn-success mt-3" disabled={!formik.isValid || !formik.dirty}>Register</button>
        </form>
        <Link to="/">Already have an account? Log in!</Link>


    </>);
}

export default Register;


// addNewUser(values)
//                 .then((res) => {
//                     if (res.data.length) {
//                         // sessionStorage.setItem("userEmail", values.email);
//                         // successMsg("Welcome, user")
//                         navigate("/home");
//                     } else errorMsg("User is already exists, log in, please");
//                 })
//     .catch((error) => console.log(error))
// resetForm();