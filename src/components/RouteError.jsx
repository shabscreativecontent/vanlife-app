import React from "react"
import { Link, useRouteError } from "react-router-dom"

export default function RouteError() {
    const err = useRouteError()
    console.log(err);

    return (
        <div className="not-found-container">
            <h1>Loader Data Router Error - Found.</h1>
            <Link to="/" className="link-button">Return to Home</Link>
        </div>
    )
}
