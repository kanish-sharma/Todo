import { Edit, Delete } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import {
    TableBody,
    TableCell,
    TableRow,
    makeStyles,
    Table,
    TableHead,
    TableSortLabel
} from "@material-ui/core";
import "./SearchList.css";
import {Button } from "@mui/material";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import Dialog from "../Dialog.jsx";


const useStyle = makeStyles(() => ({
    table:{
        "& thead th": {
            backgroundColor: "#fdc306",
            fontWeight: "600",
            color:"white"
        },
        " & tbody tr": {
            height: "1px",
            borderWidth : "1px",
            borderColor: "black"
        },
        "& tbody tr:hover": {
            cursor: "pointer"
        }
    },
    lightRow: () => ({
        backgroundColor : "#fade96"
    }),
    darkRow: () => ({
        backgroundColor : "#fdc306"
    })
}))

const headCells = [
    {id: "todoId" ,label: "ToDO Id", disableSort: true},
    {id: "title" ,label: "Title", },
    {id: "description" ,label: "Description", disableSort: true},
    {id: "createdOn" ,label: "Created On",},
    {id: "action" ,label: "Action", disableSort: true},

]
const SearchList = (props) => {
    const classes = useStyle(props);
    const [order,setOrder] = useState("");
    const [orderBy,setOrderBy] = useState("");
    const [open,setOpen] = useState(false);
    const [response, setResponse] = useState(false);
    const [id, setId] = useState("");
    const [title,setTitle] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSort = (cellId) => {
        const isAsc = (orderBy === cellId && order === "asc");
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(cellId);
    }

    const close = (res) => {
        setResponse(res);
        setOpen(false);
    }

    const handleUpdate = (e,item) => {
        e.preventDefault();
        navigate("/add", {state: {item: item}});
    };

    const handleDelete = (e,id,title) => {
        e.preventDefault();
        setOpen(true);
        setId(id);
        setTitle(title);
    }

    useEffect(() => {
      if(response){
        dispatch({
            type: "DELETE_TODO_START",
            payload: {loading: true, id: id}
        })
      }
    }, [response]);

    const sortRecord = (arr,order,orderBy) => {
        if(orderBy === "title"){
            return arr.sort((a,b) => {
                let x = a.content.toLowerCase();
                let y = b.content.toLowerCase();
                return compare(x,y,order);
            })
        }else{
            return arr.sort((a,b) => {
                let x = a.created;
                let y = b.created;
                return compare(x,y,order)
            })
        }
    };

    const compare = (x,y,order) => {
        if(order === "asc"){
            if(x < y ){
                return -1
            }
            if(x > y){
                return 1;
            }
        }else{
            if(x >y) {
                return -1
            }
            if( x<y){
                return 1;
            }
        }
        return 0;
    }
    
    const recordsSorting = () => {
        const sorted = sortRecord(props.filter.fn(props.items), order, orderBy);
        return sorted;
    }
  return (
    <div className='search-list-table'>
        {props.items !== "" ? (
            <Table className = {classes.table} stickyHeader>
                <TableHead>
                    <TableRow className = {classes.darkRow}>
                        {headCells.map((head) => (
                            <TableCell sortDirection = {orderBy === head.id ? order : false}
                            key = {head.id}>
                                {head.disableSort ? (
                                    head.label
                                ): (
                                    <TableSortLabel
                                    active = {orderBy === head.id}
                                    direction = {orderBy === head.id ? order : "asc"}
                                    onClick = {() => handleSort(head.id)}>
                                        {head.label}
                                    </TableSortLabel>
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {recordsSorting().length >0 ? (
                        recordsSorting().map((item,index) => (
                            <TableRow
                            key=  {item.id}
                            className = {
                                index %2 === 0 ? classes.lightRow : classes.darkRow
                            }>
                                <TableCell>{index+1}</TableCell>
                                <TableCell>{item.content}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell>{new Date(item.created).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Button
                                    id = {item.id}
                                    variant = "contained"
                                    onClick = {(e) => handleDelete(e,item.id,item.content)}
                                    style = {{
                                        marginLeft: "1px",
                                        marginRigth: "1px",
                                        color: "red",
                                        backgroundColor: index%2 ===0 ? "#fade96": "fdc306",
                                        boxShadow: "none"
                                    }}>
                                        <Delete/>
                                        </Button>
                                        <Button
                                        variant=  "contained"
                                        onClick = {(e) => handleUpdate(e,item)}
                                        style = {{
                                            color: "blue",
                                            backgroundColor: index%2 ===0 ? "#fade96": "fdc306",
                                            boxShadow: "none"
                                        }}><Edit/></Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ): (
                        <TableRow>
                            <TableCell
                            style= {{
                                color: "white",
                                borderBottom: 0,
                                fontSize: "1.6rem"
                            }}>
                                No Todo Found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        ): (
            <div>
                <h1 style = {{textAlign : "center",color: "white"}}>
                    No Todo Exists
                </h1>
            </div>
        )}
        <div>
            {open ? <Dialog open= {open} title= {title} close = {close} />:null}
        </div>
    </div>
  )
}

export default SearchList