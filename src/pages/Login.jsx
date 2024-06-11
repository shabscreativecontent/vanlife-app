import React from "react"
import { useNavigate, useNavigation, useActionData, useLoaderData, Form, redirect } from "react-router-dom"
import { loginUser } from "../api";

export async function loginLoader({ request }){
    return new URL(request.url).searchParams.get("message");
}

export async function action({request}){
    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")

    const pathname = new URL(request.url).searchParams.get('redirectTo') || "/host"
    
    try {
        const data = await loginUser({email, password})
        
        data && localStorage.setItem('loggedIn', true)

        if (data) {
            const res = await redirect(pathname)
            res.body = true
            return res
        }
    } catch (err) {
        return err.message;
    }

    // console.log(data);
    // return null;
}

export default function Login() {
    const paramsMessage = useLoaderData()
    const errorMessage = useActionData()
    const navigation = useNavigation()

    // console.log(navigation.state);
    // const [loginFormData, setLoginFormData] = React.useState({ email: "", password: "" })
    const [status, setStatus] = React.useState('idle')
    // const [error, setError] = React.useState(null)
    // const navigate = useNavigate()
    

    // function handleSubmit(e) {
    //     e.preventDefault()
    //     setStatus('submitting')
    //     setError(null)
    //     loginUser(loginFormData)
    //         .then(data => {
    //             console.log(data)
    //             navigate("/host", {replace: true})
    //         })
    //         .catch(err => setError(err))
    //         .finally(()=> setStatus('idle'))
    //     // console.log()
    // }

    // // console.log(error);

    // function handleChange(e) {
    //     const { name, value } = e.target
    //     setLoginFormData(prev => ({
    //         ...prev,
    //         [name]: value
    //     }))
    // }

    return (
        <div className="login-container">
            <h1>Sign in to your account</h1>
            {paramsMessage && <p className="red">{paramsMessage}</p>}
            {errorMessage && <p className="red">{errorMessage}</p>}
            <Form
                className="login-form"
                method="post"
                replace
            >
                <input
                    name="email"
                    // onChange={handleChange}
                    type="email"
                    placeholder="Email address"
                    // value={loginFormData.email}
                />
                <input
                    name="password"
                    // onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    // value={loginFormData.password}
                />
                <button 
                    disabled={navigation.state === "submitting"}
                >  {navigation.state === "submitting" ? "Logging in..." : "Log in"}
                </button>
            </Form>
        </div>
    )

}