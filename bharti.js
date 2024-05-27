import axios from 'axios';
import React, { useState, useRef} from "react";
import {useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import './home.css';

function Home(){
    const [description, setDescription] = useState("");
    const [tasktime, setTime] = useState("");
    uzonst [data, setData] = useState([]);
    const [task, setTask] = useState({});

    const descRef = useRef();
    const timeRef = useRef();
    let token = window.localStorage.getItem('token');

    console.log(token);

    const navigate = useNavigate();

    function showData(){
        axios({
            method: "get",
            baseURL: "http://localhost:9000",
            url : "tasks",
            headers : {
                Authorization : 'Bearer ' + token
            }
        }).then(response => {
            setData(response.data)}
    ).catch((error) =>{
        
            console.log(error);
        });
    }

    const handelLogout = () => {
        axios({
            method: "get",
            baseURL: "http://localhost:9000",
            url : "logout",
            headers:{
                Authorization : 'Bearer ' + token
            }
        }).then(response =>{

                if(response){
                    navigate("/");
                }
                else{
                    console.log(response);
                    alert("there is somthing wrong pls check");
                }

        }).catch(error =>{
            console.log(error);
        });
        return false;
    }

    const handleTask = (e) => {
        e.preventDefault();
        
        const task = {description : description,
             tasktime : moment(tasktime).format("YYYY-MM-DD"), 
             status : 0
            };
        setTask(task);
        
        axios({
            method: "post",
            baseURL: "http://localhost:9000",
            url : "tasks",
            data : task,
            headers : {
                'Content-Type' : 'application/json',
                Authorization : 'Bearer ' + token
            }
        }).then(response =>{
            if(response){
                alert("Successfully added task to todo list");
                showData();
                setDescription("");
                setTime("");
            }
            else{
                alert("There occurred some error");
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    function handleEditTodo(id){

        task.description = descRef.current.value;
        task.tasktime = moment(timeRef.current.value).format("YYYY-MM-DD");

        setTask(task);
        console.log(task);
        axios({
            method: "put",
            baseURL: "http://localhost:9000",
            url : tasks/${id},
            data : task,
            headers : {
                'Content-Type' : 'application/json',
                Authorization : 'Bearer ' + token
            }
        }).then(response =>{
            if(response){
                alert("Successfully edited task to todo list");
                showData();
                setDescription("");
                setTime("");
            }
            else{
                alert("There occurred some error");
            }
        })
        .catch((error) => {
            console.log("Error");
            //console.log(error);
        });
        return false;
    };

    function getTaskById(id){
        axios({
            method : "get",
            baseURL: "http://localhost:9000",
            url : tasks/${id},
            headers : {
                Authorization : 'Bearer ' + token
            }
        }).then(response =>{
            if(response){
                console.log(response);
                setDescription(response.data.description);
                setTime(moment(response.data.tasktime).format("YYYY-MM-DD"));
                console.log(task);

                const updateButton = document.getElementById("updateButton");
                updateButton.onclick = () => handleEditTodo(id);
  
            }
            else{
                alert("There occurred some error");
            }
        }).catch((error) => {
            
            console.log(error);
        });
    }

    
    function handleToggleStatus(id){
        task.status = 1;
        axios({
            method: "put",
            baseURL: "http://localhost:9000",
            url : tasks/${id},
            data : task,
            headers : {
                'Content-Type' : 'application/json',
                Authorization : 'Bearer ' + token
            }
        }).then(response =>{
            if(response){
                alert("Successfully updated task to todo list");
                showData();
            }
            else{
                alert("There occurred some error");
            }
        })
        .catch((error) => {
            console.log(error);
        });
        return false;
    }

    function handleDeleteTodo(id){
        console.log(id);
        axios({
            method: "delete",
            baseURL: "http://localhost:9000",
            url : tasks/${id},
            headers : {
                Authorization : 'Bearer ' + token
            }
        }).then(response =>{
            if(response){
                alert("Successfully deleted task to todo list");
                showData();
            }
            else{
                alert("There occurred some error");
            }
        })
        .catch((error) => {
            console.log(error);
        });
        return false;
    }
    
    return(
        <>
        <div className="heading"> Todo List </div> <br />
            <div className='logout'>
                <button type='submit' id='button1' onClick={handelLogout}>Logout</button>
            </div><br />
            <div className="box1">
            
                <div className='form2'>
                    <input type="text" value={description} ref={descRef} onChange={(e) => setDescription(e.target.value)} placeholder='Enter Task' required/>
                    <input type="date" value={tasktime} ref={timeRef} onChange={(e) => setTime(moment(e.target.value).format("YYYY-MM-DD"))} required/>
                    <button type="submit" onClick={handleTask}>Add</button>
                    <button type="submit" id='updateButton'>Update</button>
                </div>
            </div>

            <div className="box">
                 <button id="button2" onClick={showData}>Show tasks</button><br />
                <div className='taskDisplay'>
                    <table>
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Due Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            data.map((d, id) => (
                                <tr key={id}>
                                    <td>{d.description}</td>
                                    <td>{d.tasktime}</td>
                                    <td>{d.status == 1 ? "Completed" : "Pending"}</td>
                                    <td>
                                    <button type="submit" onClick={() => getTaskById(d.taskid)}>
                                    <FontAwesomeIcon icon={faPen} />    
                                    </button>
                                    <button type='submit' onClick={() => handleToggleStatus(d.taskid)}>
                                    <FontAwesomeIcon icon={faCheck} />
                                    </button>
                                    <button type='submit' onClick={() => handleDeleteTodo(d.taskid)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Home;