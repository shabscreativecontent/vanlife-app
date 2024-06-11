import { redirect } from "react-router-dom";

export async function requireAuth(request){
    const pathname = new URL(request.url).pathname
    const isLoggedIn = localStorage.getItem("loggedIn")

    // console.log(isLoggedIn);

    if (!isLoggedIn) {
        const res = await redirect(
            `/login?message=You most log in first.&redirectTo=${pathname}`
        )
        res.body = true
        return res
    }

    return null
}