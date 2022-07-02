import axios from "axios";

const bearer =  "3acac47162b28c4026ddc83fbe863be169a0b6ab";

export const apiGet = async () => {
    const url = await axios.get("https://api.todoist.com/rest/v1/tasks", {
        headers:{
            "Content-Type": "application/json",
            Authorization : `Bearer ${bearer}`
        }
    });
    return url;
};

export const apiPost = async (payload) => {
    const obj = {content: payload.title , description : payload.description};
    const todo = JSON.stringify(obj);
    const url = await axios.post("https://api.todoist.com/rest/v1/tasks", todo,{
        headers:{
            "Content-Type": "application/json",
            Authorization : `Bearer ${bearer}`
        }
    });
    return url;
};

export const apiUpdate = async (payload) => {
    const obj = {content: payload.title , description : payload.description};
    const todo = JSON.stringify(obj);
    console.log(payload,todo);
    const url = await axios.post(`https://api.todoist.com/rest/v1/tasks/${payload.id}`,todo, {
        headers:{
            "Content-Type": "application/json",
            Authorization : `Bearer ${bearer}`
        }
    });
    console.log(url);
    return url;
};

export const apiDelete = async (payload) => {
    const url = await axios.delete(`https://api.todoist.com/rest/v1/tasks/${payload}`, {
        headers:{
            "Content-Type": "application/json",
            Authorization : `Bearer ${bearer}`
        }
    });
    return url;
}