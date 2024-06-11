import React from "react";
import { useOutletContext } from "react-router-dom";

export default function HostVanPhoto(){
    const {currentVan} = useOutletContext()

    return(
        <img src={currentVan.imageUrl} alt="" className="host-van-detail-image" />
    )
}