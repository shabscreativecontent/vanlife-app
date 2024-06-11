import React from "react";
import {getVans, getHostVans } from "../../api"
import { 
    useParams, 
    Link, 
    Outlet, 
    NavLink, 
    useLoaderData, 
} from "react-router-dom";
import { requireAuth } from "../../utilis";

export async function loader({params, request}){
    await requireAuth(request)
    return getHostVans(params.id)
}

export default function HostVanDetail(){
    // const { id } = useParams()
    const currentVan = useLoaderData()
    // const [currentVan, setCurrentVan] = React.useState(null)

    const activeLink = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    return(
        <section>
            <Link
                to=".."
                relative="path"
                className="back-button"
            >&larr; <span>Back to all vans</span></Link>

            <div className="host-van-detail-layout-container">
                <div className="host-van-detail">
                    <img src={currentVan.imageUrl} alt="" />
                    <div className="host-van-detail-info-text">
                        <i
                            className={`van-type van-type-${currentVan.type}`}
                        >
                            {currentVan.type}
                        </i>
                        <h3>{currentVan.name}</h3>
                        <h4>${currentVan.price}/day</h4>
                    </div>
                </div>

                <nav className="host-van-detail-nav">
                    <NavLink
                        to="."
                        style={({isActive}) => isActive ? activeLink : null}
                        end
                    >
                        Details
                    </NavLink>
                    
                    <NavLink
                        to="pricing"
                        style={({isActive}) => isActive ? activeLink : null}
                    >
                        Pricing
                    </NavLink>
                    
                    <NavLink
                        to="photos"
                        style={({isActive}) => isActive ? activeLink : null}
                    >
                        Photos
                    </NavLink>
                    
                </nav>

                <Outlet context={{currentVan}} />
            </div>

        </section>
    )
}