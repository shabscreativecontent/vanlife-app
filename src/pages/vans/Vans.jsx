import React, { useState } from "react"
import {getVans, getHostVans} from "../../api"
import { 
    Link, 
    useSearchParams, 
    useLoaderData, 
    defer ,
    Await
} from "react-router-dom"

export async function loader(){
    const vansPromise = getVans()
    return  defer({vans: vansPromise})
}

export default function Vans() {
    const vansPromise = useLoaderData()
    const [searchParams, setSearchParams] = useSearchParams()
    // const [vans, setVans] = React.useState(loaderData)
    // const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // console.log(loaderData);
    // setVans(loaderData)
    
    const typeFilter = searchParams.get('type')
    // console.log(typeFilter)

    // React.useEffect(() => {
    //     async function loadVans(){
    //         setLoading(true)
    //         try {
    //             const data = await getVans()
    //             setVans(data)
    //         } catch (err) {
    //             setError(err)
    //         } finally {
    //             setLoading(false)
    //         }
    //     }

    //     loadVans()
    // }, [])
    // console.log(error);

    // const displayVans = typeFilter ? vans.filter(van => van.type === typeFilter) : vans

    // const vanElements = displayVans.map(van => (
    //     <div key={van.id} className="van-tile">
    //         <Link 
    //             to={`${van.id}`}
    //             state={{
    //                 search: `?${searchParams.toString()}`,
    //                 typeFilter: typeFilter
    //             }}
    //             >
    //             <img src={van.imageUrl} alt="" />
    //             <div className="van-info">
    //                 <h3>{van.name}</h3>
    //                 <p>${van.price}<span>/day</span></p>
    //             </div>
    //             <i className={`van-type ${van.type} selected`}>{van.type}</i>
    //         </Link>
    //     </div>
    // ))

    // if(loading){
    //     return <h1>Loading...</h1>
    // }

    if(error){
        return <h1>There was an error: {error}</h1>
    }

    function renderVansElement(vansData){
        const displayVans = typeFilter ? vansData.filter(van => van.type === typeFilter) : vansData
        
        const vanElements = displayVans.map(van => (
            <div key={van.id} className="van-tile">
                <Link 
                    to={`${van.id}`}
                    state={{
                        search: `?${searchParams.toString()}`,
                        typeFilter: typeFilter
                        }}
                        >
                    <img src={van.imageUrl} alt="" />
                    <div className="van-info">
                        <h3>{van.name}</h3>
                        <p>${van.price}<span>/day</span></p>
                    </div>
                    <i className={`van-type ${van.type} selected`}>{van.type}</i>
                </Link>
            </div>
        ))
        
        return(
            <>
                <div className="van-list-filter-buttons">
                    <button 
                        onClick={() => setSearchParams({type: "simple"})}
                        className={`van-type simple ${typeFilter === "simple" ? "selected" : null}`}
                    >Simple</button>
                    <button 
                        onClick={() => setSearchParams({type: "luxury"})}
                        className={`van-type luxury ${typeFilter === "luxury" ? "selected" : null}`}
                    >Luxury</button>
                    <button 
                        onClick={() => setSearchParams({type: "rugged"})}
                        className={`van-type rugged ${typeFilter === "rugged" ? "selected" : null}`}
                    >Rugged</button>
                    { typeFilter ? (
                    <button 
                        onClick={() => setSearchParams({})}
                        className="van-type clear-filters"
                    >Clear filter</button>
                    ) : null }

                </div>
                <div className="van-list">
                    {vanElements}
                </div>
            </>
        )
    }

    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <React.Suspense fallback={<h1>Loading vans...</h1>}>
                <Await resolve={vansPromise.vans}>
                    {renderVansElement}
                </Await>
            </React.Suspense>
        </div>
    )
}