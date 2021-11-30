import "./search.css";
//import { useState } from 'react'
import { Search } from "@mui/icons-material";

export default function SearchFilter() {
    //const [searchTerm, setSearchTerm] = useState();

    return (
        <>
            <div className="search">
                <div className="searchBox">
                    <Search className="searchIcon"/>
                    <input type="text" className="searchInput" placeholder="Search..." />                
                </div>
                <div className="searchResult"></div>               
            </div>
        </>
    )
}
