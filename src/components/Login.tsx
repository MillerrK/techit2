import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { checkUser } from "../services/usersService";
import { errorMsg, successMsg } from "../services/feedbackService";
import { createCart } from "../services/cartsService";

interface LoginProps {

}

const Login: FunctionComponent<LoginProps> = () => {
    let navigate = useNavigate();
    let formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: yup.object({
            email: yup.string().required().email(),
            password: yup.string().required().min(8),
        }),
        onSubmit: (values) => {
            checkUser(values)
                .then((res) => {
                    if (res.data.length) {
                        sessionStorage.setItem("userEmail", values.email);
                        sessionStorage.setItem("userName", res.data[0].name);
                        sessionStorage.setItem("isLoggedIn", "true");
                        sessionStorage.setItem("isAdmin", res.data[0].isAdmin);
                        sessionStorage.setItem("userId", res.data[0].id);

                        navigate("/home");
                        successMsg(`You are logged in as ${values.email}`)
                    } else errorMsg("Wrong email or password");
                })
                .catch((err) => console.log(err));
        },
    });
    return (<>
        <div className="container col-md-3">
            <form className="mb-3" onSubmit={formik.handleSubmit}>
                <h3 className="display-1">LOGIN</h3>
                <div className="form-floating mb-3">
                    <input
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="Email address"
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
                        onBlur={formik.handleBlur}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                    {formik.touched.password && formik.errors.password && (
                        <p className="text-danger">{formik.errors.password}</p>
                    )}
                </div>
                <button type="submit" disabled={!formik.isValid || !formik.dirty} className="btn btn-secondary w-100 mt-3">Login</button>

            </form>



            <Link to="/register">Don't have an account? Create it!</Link>


        </div>


    </>);
}

export default Login;