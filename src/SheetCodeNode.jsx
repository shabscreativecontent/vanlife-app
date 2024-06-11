// Layout Components and Link

import React from "react"
import { Outlet, Link } from "react-router-dom"

export default function Layout() {
  return (
    <>
    <nav>
      <Link to="/">Home</Link>
      <Link to="protected">Protected</Link>
    </nav>
    <main>
      <Outlet />
    </main>
    </>
  );
}



// Index.jsx path/Routes

// import React from "react"
import ReactDOM from "react-dom/client"
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom"

// import Layout from "./Layout"
import AuthRequired from "./AuthRequired"

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<h1>Home page</h1>} />
    
    <Route element={<AuthRequired />}>
      <Route path="protected" element={<h1>Super secret info here</h1>} />
    </Route>
    
  </Route>
))

function App() {
  return (
    <RouterProvider router={router} />
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)



// AuthRequired Component 

// import React from "react"
import { Outlet, Navigate } from "react-router-dom"

export default function AuthRequired() {
    const isLoggedIn = false
    if (!isLoggedIn) {
        return <Navigate to="/login" />
    }
    return <Outlet />
}












// *******************************************************************
// Using Authentication Request with Loader 

import React from "react"
import ReactDOM from "react-dom/client"
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  redirect
} from "react-router-dom"

import Layout from "./Layout"
import AuthRequired from "./AuthRequired"

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route
      index
      element={<h1>Home page</h1>}
      loader={async () => {
        return null
      }}
    />
    <Route
      path="protected"
      element={<h1>Super secret info here</h1>}
      loader={async () => {
        const isLoggedIn = false
        if(!isLoggedIn) {
          throw redirect("/login")
        }
        return null
      }}
    />
    <Route path="login" element={<h1>Login page goes here</h1>} />

  </Route>
))

function App() {
  return (
    <RouterProvider router={router} />
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)











// *******************************************************************
// Using Authentication Request with Parallel Loaders


// Layout Route
import React from "react"
import { Outlet, Link } from "react-router-dom"

export default function Layout() {
  return (
    <>
    <nav>
      <Link to="/">Home</Link>
      <Link to="protected">Protected</Link>
      <Link to="login">Login</Link>
    </nav>
    <main>
      <Outlet />
    </main>
    </>
  );
}


// Index.jsx
import React from "react"
import ReactDOM from "react-dom/client"
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  redirect
} from "react-router-dom"

import Layout from "./Layout"
import AuthRequired from "./AuthRequired"

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route
      index
      element={<h1>Home page</h1>}
      loader={async () => {
        return null
      }}
    />
    <Route
      path="protected"
      element={<h1>Super secret info here</h1>}
      loader={async () => {
        const rand = Math.random()
        setTimeout(() => {
          console.log("Protected route")
        }, rand)
        return null
      }}
    >
      <Route 
        path="nested" 
        element={<h1>Nested protected route</h1>} 
        loader={async () => {
          const rand = Math.random()
          setTimeout(() => {
            console.log("Nested protected route")
          }, rand)
          return null
        }}
      />
    </Route>
    <Route path="login" element={<h1>Login page goes here</h1>} />

  </Route>
))

function App() {
  return (
    <RouterProvider router={router} />
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)








// ***********************************************************************
// Consume message from search param on login page

import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  redirect,
  useSearchParams
} from "react-router-dom"

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route
      index
      element={<h1>Home page</h1>}
    />
    <Route
      path="protected"
      element={<h1>Super secret info here</h1>}
      loader={async () => await requireAuth()}
    />
    <Route path="login" element={<Login />} loader={loginLoader}/>

  </Route>
))


// Required
import { 
  redirect,
  useSearchParams,
  useLoaderData
 } from "react-router-dom";

export async function requireAuth(){
  const isLoggedIn = false

  if (!isLoggedIn){
    throw redirect("/login?message=you most log in first")
  }
}


// LoginLoader
function loginLoader({ request }){
  // console.log(new URL(request.url).searchParams.get("message"))
  return new URL(request.url).searchParams.get("message")

  // return null
}


// Login Components.
function Login() {
  const paramMessage = useLoaderData()

  // const [searchParams, setSearchParams] = useSearchParams()
  // console.log(searchParams.get("message"))

  return (
    <>
      {paramMessage && <h2>{paramMessage}</h2>}
      <h1>Login page goes here</h1>
    </>
  )
}









// **********************************************************************************
// FORM in React.JS
import React from "react"

export default function Form() {
    const [formData, setFormData] = React.useState(
        {
            firstName: "Bob", 
            lastName: "Z", 
            email: "b@b.com", 
            comments: "Blahblahblah", 
            isFriendly: true,
            employment: "full-time",
            favColor: "blue"
        }
    )
    
    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }
    
    function handleSubmit(event) {
        event.preventDefault()
        // submitToApi(formData)
        console.log(formData)
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="First Name"
                onChange={handleChange}
                name="firstName"
                value={formData.firstName}
            />
            <input
                type="text"
                placeholder="Last Name"
                onChange={handleChange}
                name="lastName"
                value={formData.lastName}
            />
            <input
                type="email"
                placeholder="Email"
                onChange={handleChange}
                name="email"
                value={formData.email}
            />
            <textarea 
                value={formData.comments}
                placeholder="Comments"
                onChange={handleChange}
                name="comments"
            />
            <input 
                type="checkbox" 
                id="isFriendly" 
                checked={formData.isFriendly}
                onChange={handleChange}
                name="isFriendly"
            />
            <label htmlFor="isFriendly">Are you friendly?</label>
            <br />
            <br />
            
            <fieldset>
                <legend>Current employment status</legend>
                <input 
                    type="radio"
                    id="unemployed"
                    name="employment"
                    value="unemployed"
                    checked={formData.employment === "unemployed"}
                    onChange={handleChange}
                />
                <label htmlFor="unemployed">Unemployed</label>
                <br />
                
                <input 
                    type="radio"
                    id="part-time"
                    name="employment"
                    value="part-time"
                    checked={formData.employment === "part-time"}
                    onChange={handleChange}
                />
                <label htmlFor="part-time">Part-time</label>
                <br />
                
                <input 
                    type="radio"
                    id="full-time"
                    name="employment"
                    value="full-time"
                    checked={formData.employment === "full-time"}
                    onChange={handleChange}
                />
                <label htmlFor="full-time">Full-time</label>
                <br />
            </fieldset>
            <br />
            
            <label htmlFor="favColor">What is your favorite color?</label>
            <br />
            <select 
                id="favColor" 
                value={formData.favColor}
                onChange={handleChange}
                name="favColor"
            >
                <option value="red">Red</option>
                <option value="orange">Orange</option>
                <option value="yellow">Yellow</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
                <option value="indigo">Indigo</option>
                <option value="violet">Violet</option>
            </select>
            <br />
            <br />
            <button>Submit</button>
        </form>
    )
}










// ************************************************************************************
import React from "react"
import { useNavigate, Form } from "react-router-dom"

export async function action({request}){
  // console.log(obj, "Console.log() Params which is the id from login path, and its from url search params.");

  const formData = await request.formData()
  const email = formData.get("email")
  const password = formData.get("password")


  console.log(email, password);
  return null;
}

export default function Login() {
    return (
        <Form method="post">
            <input
                type="email"
                name="email"
                placeholder="Email address"
            />
            <br />
            <input
                type="password"
                name="password"
                placeholder="Password"
            />
            <br />
            <button>Log in</button>
        </Form>
    )
}



// Index js for form Action
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  redirect
} from "react-router-dom"

import Layout from "./Layout"
import Login, { action as loginAction } from "./Login"

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route
      index
      element={<h1>Home page</h1>}
    />
    <Route
      path="protected"
      element={<h1>Super secret info here</h1>}
      loader={async () => {
        const isLoggedIn = false
        if (!isLoggedIn) {
          throw redirect("/login")
        }
        return null
      }}
    />
    <Route
      path="login/:id"
      element={<Login />}
      action={loginAction}
    />

  </Route>
))

function App() {
  return (
    <RouterProvider router={router} />
  )
}






// ***********************************************************************************
// Get Previous Route PathName


import React from "react"
import ReactDOM from "react-dom/client"
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  redirect
} from "react-router-dom"

import Layout from "./Layout"
import Login, { action as loginAction } from "./Login"
import Protected, { loader as protectedLoader } from "./Protected"
import { requireAuth } from "./requireAuth"

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route
      index
      element={<h1>Home page</h1>}
    />
    <Route
      path="protected"
      element={<Protected />}
      loader={protectedLoader}
    >
      <Route 
        path="nested" 
        element={<h1>Nested protected route</h1>} 
        loader={async ({request}) => {
          await requireAuth(request)
          return null
        }}
      />
    </Route>
    <Route
      path="login"
      element={<Login />}
      action={loginAction}
    />

  </Route>
))


// *****************************
import React from "react"
import { Outlet, Link } from "react-router-dom"

function fakeLogoutUser() {
  localStorage.removeItem("loggedin")
}

export default function Layout() {
  return (
    <>
    <nav>
      <Link to="/">Home</Link>
      <Link to="protected">Protected</Link>
      <Link to="protected/nested">Nested</Link>
      <Link to="login">Login</Link>
      <button onClick={fakeLogoutUser}>X</button>
    </nav>
    <main>
      <Outlet />
    </main>
    </>
  );
}


// ************
async function fakeLoginUser(creds) {
  await sleep(1000)
  if (creds.email === "b@b.com" && creds.password === "p123") {
      localStorage.setItem("loggedin", true)
      return {
          email: creds.email,
          token: "1234567890abcdef"
      }
  }
  throw new Error("Couldn't log the user in")
}

export async function action({ request }) {
  const formData = await request.formData()
  const email = formData.get("email")
  const password = formData.get("password")

  const pathname = new URL(request.url).searchParams.get('redirectTo')
  const pathUrl = pathname ? pathname : "/protected"

  // console.log(pathname);

  try {
      const user = await fakeLoginUser({ email, password })
      return redirect(pathUrl)
  } catch (err) {
      return err.message
  }
}

export default function Login() {
  const errorMessage = useActionData()
  const navigation = useNavigation()
  
  return (
      <Form method="post" replace>
          <h2>Login</h2>
          {errorMessage && <h4 className="red">{errorMessage}</h4>}
          <input
              type="email"
              name="email"
              placeholder="Email address"
          />
          <br />
          <input
              type="password"
              name="password"
              placeholder="Password"
          />
          <br />
          <button disabled={navigation.state === "submitting"}>
              {navigation.state === "submitting" ? "Logging in ..." : "Log in"}
          </button>
      </Form>
  )
}


// ******************
import { redirect } from "react-router-dom"

export async function requireAuth(request) {
    const pathname = new URL(request.url).pathname
    const isLoggedIn = localStorage.getItem("loggedin")
    
    if (!isLoggedIn) {
        throw redirect(`/login?redirectTo=${pathname}`)
    }
}



// ********************
import React from "react"
import { redirect, Outlet } from "react-router-dom"
import { requireAuth } from "./requireAuth"

export async function loader({ request }) {
    // const url = new URL(request.url).pathname
    await requireAuth( request )
    return null
}

export default function Protected() {
    return (
        <>
            <h1>Super secret info here</h1>
            <Outlet />
        </>
    )
}



// **********************************************************************************
// Using of defer promise Data *over* an Await Data


import React, { Suspense } from "react"
import { useLoaderData, defer, Await } from "react-router-dom"
import { sleep, getWeather } from "./utils"

export async function loader() {
  // the await is use for delay.
    const weatherPromise = await getWeather()
    return defer({weather: weatherPromise}) 
}

export default function Weather() {
    const loaderData = useLoaderData()
    const iconUrl =
        `http://openweathermap.org/img/wn/${loaderData.weather[0].icon}@2x.png`

    return (
        <section className="weather-container">
            <h1>Weather in Salt Lake City</h1>
            <React.Suspense fallback={<h1>Loading weather...</h1>}>
              <Await resolve={loaderData.weather}>
                {(loadedWeather) => {
                    const iconUrl =
                        `http://openweathermap.org/img/wn/${loadedWeather.weather[0].icon}@2x.png`
                    return (
                        <>
                            <h3>{loadedWeather.main.temp}ºF</h3>
                            <img src={iconUrl} />
                        </>
                    )
                }}
              </Await>
            </React.Suspense>
        </section>
    )
}


