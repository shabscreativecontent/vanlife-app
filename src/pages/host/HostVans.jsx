import React from "react";
import {getVans, getHostVans } from "../../api";
import { Link, useLoaderData, defer, Await } from "react-router-dom";
import { requireAuth } from "../../utilis";

export async function loader({request}){
    await requireAuth(request)
    return defer({ hostVans: getHostVans() })
}

export default function HostVans(){
    const vansPromise = useLoaderData()
    // const [vans, setVans] = React.useState([])

    function hostVansDataElement(hostVansData){
        const hostVansEls = hostVansData.map(van => (
            <Link
                to={`${van.id}`}
                key={van.id}
                className="host-van-link-wrapper"
            >
                <div className="host-van-single" key={van.id}>
                    <img src={van.imageUrl} alt={`Van pix of ${van.name}`} />
                    <div className="host-van-info">
                        <h3>{van.name}</h3>
                        <p>${van.price}/day</p>
                    </div>
                </div>
            </Link>
        ))

        return(
            <div className="host-vans-list">

                <section>
                    {hostVansEls}
                </section>
    
            </div>
        )
    }

    return(
        <section>
            <h1 className="host-vans-title">Your listed vans</h1>
            <React.Suspense fallback={<h1>Loading vans...</h1>}>
                <Await resolve={vansPromise.hostVans}>
                    {hostVansDataElement}
                </Await>
            </React.Suspense>
            
        </section>
    )
}