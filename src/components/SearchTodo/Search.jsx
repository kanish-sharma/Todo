import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import "./Search.css";
import SearchBar from './SearchBar';
import SearchList from './SearchList';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector, useDispatch } from "react-redux";


const useStyle = makeStyles(() => ({
    root : {
        width: "200%",
        backgroundColor: "white"
    },
    button: {
        cursor: "pointer",
        backgroundColor: "#e2c016",
        width: "15%",
        boxShadow: "auto"
    }
}));

const Search = () => {
    const [filter,setFilter] = useState({
        fn : items => {
            return items;
        }
    })

    const classes = useStyle();

    let {todo, loading} = useSelector((state) => state.data);
    const dispatch = useDispatch();

    useEffect(() => {
        if(loading === false){
            dispatch({type: "FETCH_TODO_START", payload: ""});
        }
    }, []);

  return (
    <>
    {loading === false ? (
        <div className='search-container-main'>
            <div className='search-container'>
                <SearchBar setFilter = {setFilter}/>
                <SearchList items = {todo} filter = {filter} /> 
            </div>
        </div>
    ) : (
        <Backdrop className = {classes.backdrop} open>
            <CircularProgress color = "inherit"/>
        </Backdrop>
    )}
    </>
  )
}

export default Search