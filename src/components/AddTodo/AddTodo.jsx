import React, { useEffect, useState } from "react";
import "./AddTodo.css";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Button , TextField } from "@material-ui/core";

const AddTodo = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const content = location.state.item.content;
      const descript = location.state.item.description;
      setDescription(descript);
      setTitle(content);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.state) {
      let id = location.state.item.id;
      dispatch({
        type: "UPDATE_TODO_START",
        payload: { loading: true, title, description, id },
      });
    } else {
      dispatch({
        type: "POST_TODO_START",
        payload: { loading: true, title, description },
      });
    }
    navigate("/home");
  };
  return (
    <div className="add-container">
      <h3>ToDo Details</h3>
      <form onSubmit={handleSubmit}>
        <div className="add-form">
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            inputProps={{ maxLength: 15 }}
            style={{ margin: "0.1% 0% 5% 0%" }}
          />
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            required
            multiline
            rows={4}
            inputProps={{ maxLength: 60 }}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div>
          <Button
            type="submit"
            style={{
              margin: "20px",
              backgroundColor: "#ffc107",
              color: "#FFFFFF",
            }}
            variant="contained"
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate("/home")}
            style={{
              margin: "20px",
              backgroundColor: "#ffc107",
              color: "#FFFFFF",
            }}
            variant="contained"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
