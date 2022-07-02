import React, {useState} from 'react';
import "./SearchBar.css";
import {Search} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core";
import { InputAdornment, TextField } from '@material-ui/core';

const useStyle = makeStyles(() => ({
    root: {
        width:"200%",
        backgroundColor: "white",
        borderRadius: "5px"
    },
    button:{
        cursor: "pointer",
        backgroundColor: "#fbd720"
    }
}))

const SearchBar = (props) => {
    const [searchTerm, setSearchTerm] = useState("");
    const classes = useStyle();

    const handleSearch = (e) => {
        const target = e.target;
        setSearchTerm(target.value);
        props.setFilter({
            fn: (items) => {
                if(target.value === "" || target.value.length <3){
                    return items;
                }else{
                    return items.filter((x) => x.content.toLowerCase().includes(target.value.toLowerCase()))
                }

            }
        })
    }
  return (
    <div className='search-bar-container'>
        <div className='search-bar'>
            <TextField
            className = {classes.root}
            variant=  "outlined"
            value = {searchTerm}
            onChange = {handleSearch}
            placeholder=  "Search by title"
            inputProps = {{
                startAdornment: (
                    <InputAdornment position = "start">
                        <Search/>
                    </InputAdornment>
                )
            }}/>
        </div>
    </div>
  )
}

export default SearchBar