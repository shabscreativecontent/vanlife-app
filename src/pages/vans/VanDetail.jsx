import React from "react"
import {getVans, getHostVans} from "../../api"
import { useParams, Link, useLocation, useLoaderData } from "react-router-dom"

export async function loader({ params }){
    // console.log(params);
    return getVans(params.id)
}

export default function VanDetail() {
    // const params = useParams()
    const location = useLocation()
    const van = useLoaderData()
    // const [van, setVan] = React.useState(null)

    const search = location.state?.search || ""; 
    const typeFilter = location.state?.typeFilter || "all"; 

    return (
        <div className="van-detail-container">
            <Link
                to={`..${search}`}
                relative="path"
                className="back-button"
            >&larr; <span>Back to {typeFilter} vans</span></Link>

           
            <div className="van-detail">
                <img src={van.imageUrl} alt="" />
                <i className={`van-type ${van.type} selected`}>
                        {van.type}
                    </i>
                <h2>{van.name}</h2>
                <p className="van-price"><span>${van.price}</span>/day</p>
                <p>{van.description}</p>
                <button className="link-button">Rent this van</button>
            </div>
            
        </div>
    )
}