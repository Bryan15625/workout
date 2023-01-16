import React, { useState, useRef, useEffect } from 'react';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import { v4 as uuidv4 } from 'uuid';
import '../App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLocation, useNavigate, Navigate } from "react-router-dom"
import Axios from "axios"
import Login from './Login';


function AddSet({ handleSet, exercises, sets, count, setID, removeSet }) {
    return (
        <div style={{}}>
            <div style={{ fontSize: '20px' }}>
                Set #{count} &nbsp;
            </div>
            <button onClick={(e) => {
                removeSet(e, setID)
            }}>Remove Set</button>
            <div class="container">
                <div class="row">
                    <div style={{ borderBottom: '1px rgb(0, 0, 0) solid', fontSize: '20px' }} class="col-4">
                        Reps
                        <EditTextarea
                            name="reps"
                            rows={2}
                            style={{ width: '200px', fontSize: "16px" }}
                            placeholder="Reps completed..."
                            value={sets.reps}
                            onChange={(e) => {
                                handleSet(e, sets, setID)
                            }}
                        />
                    </div>

                    <div style={{ borderBottom: '1px rgb(0, 0, 0) solid', fontSize: '20px' }} class="col-4">
                        Weight
                        <EditTextarea
                            name="weight"
                            rows={2}
                            style={{ width: '200px', fontSize: "16px" }}
                            placeholder="Weight used..."
                            value={sets.weight}
                            onChange={(e) => {
                                handleSet(e, sets, setID)
                            }}
                        />
                    </div>
                    <div style={{ borderBottom: '1px rgb(0, 0, 0) solid', fontSize: '20px' }} class="col-4">
                        Notes
                        <EditTextarea
                            name='notes'
                            rows={2}
                            placeholder="Enter any notes you have..."
                            style={{ fontSize: '16px', width: "250px" }}
                            value={sets.notes}
                            onChange={(e) => {
                                handleSet(e, sets, setID)
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}


function AddExercise({ handleSet, exerciseTitle, exercises, exerciseID, removeExercise, addSet, setID, count, removeSet }) {
    return (
        <>
            <div>
                <EditTextarea
                    name="exercise-title"
                    rows={2}
                    style={{ width: '600px', fontSize: "20px", textAlign: "left" }}
                    placeholder="Edit exercise name"
                    value={exercises.title}
                    onChange={(e) => {
                        exerciseTitle(e, exerciseID)
                    }}
                />
                <button onClick={(e) => {
                    removeExercise(e, exerciseID)
                }}>Remove Exercise</button>

                <button onClick={(e) => {
                    addSet(e, exerciseID)
                }}>Add Set</button>
                {exercises.sets.map((sets, count) => {
                    return (
                        <AddSet
                            sets={sets}
                            setID={sets.id}
                            exercises={exercises}
                            count={count + 1}
                            removeSet={(e, setID) => {
                                removeSet(e, setID, exerciseID, exercises)
                            }}
                            handleSet={(e, setID, sets) => {
                                handleSet(e, setID, sets, exerciseID, exercises)
                            }}
                        />
                    )
                })}


            </div>
        </>
    )
}


function WorkoutTracker({ handleSet, exerciseTitle, workoutData, count, workoutDataID, removeExercise, addExercise, removeWorkout,
    addSet, removeSet, date, workoutTitle }) {


    return (
        <>
            <div class="container">
                <div class="row">
                    <div class="col-3">
                        <button onClick={(e) => {
                            removeWorkout(e, workoutDataID)
                        }}>Remove Workout</button>
                    </div>
                    <div class="col-9">
                        <button onClick={(e) => {
                            addExercise(e, workoutDataID)
                        }}>Add Exercise</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <EditTextarea
                            defaultValue={"Workout on " + date.toDateString()}
                            name="textbox1"
                            style={{ fontSize: "22px", width: '200px', textAlign: "left" }}
                            placeholder="Enter a workout title..."
                            value={workoutData.title}
                            onChange={(e) => {
                                workoutTitle(e, workoutDataID)
                            }}
                        />

                    </div>
                    <div style={{ borderBottom: '1px rgb(0, 0, 0) solid' }} class="col-9">
                        {workoutData.exercises.map((exercises, count) => {
                            return (
                                <AddExercise
                                    exercises={exercises}
                                    exerciseID={exercises.id}
                                    removeExercise={(e, exerciseID) => {
                                        removeExercise(e, exerciseID, workoutData)
                                    }}
                                    addSet={(e, exerciseID) => {
                                        addSet(e, exerciseID, workoutData)
                                    }}
                                    removeSet={(e, setID, exerciseID, exercises) => {
                                        removeSet(e, setID, exerciseID, workoutData, exercises)
                                    }}
                                    count={count + 1}
                                    exerciseTitle={(e, exerciseID) => {
                                        exerciseTitle(e, exerciseID, exercises)
                                    }}
                                    handleSet={(e, sets, setID, exerciseID) => {
                                        handleSet(e, sets, setID, exerciseID, exercises)
                                    }}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

function Workout({ authorized }) {
    let navigate = useNavigate();



    function getDefaultWorkout() {
        return {
            "id": uuidv4(),
            "title": "Workout on " + date.toDateString(),
            "exercises": []
        }
    }

    function Testing() {
        // console.log("data", data)
    }

    const sendData = (e) => {
        e.preventDefault()
        Axios.post("http://localhost:4000/workout", {
            data: JSON.stringify(data)
        })
            .then(res => {
                if (res.data) {
                    const oldData = res.data.data
                    console.log("from database",oldData)
                    // setData(oldData)
                    // console.log("data",data)
                }
                else {
                    // navigate("/workout", {
                    //     state: {
                    //         username: loginUsername,
                    //         authorized: true
                    //     }
                    // })
                }
            }, (error) => {
                console.log(error);
            });
    }
    const getData = (e) => {
        e.preventDefault()
        Axios.post("http://localhost:4000/getdata", {
            username: location.state.username
        })
            .then(res => {
                if (res.data) {
                    const oldData = res.data.data
                    console.log("from database",oldData)
                    setData(oldData)
                }
                else {
                }
            }, (error) => {
                console.log(error);
            });
    }
    
    const location = useLocation()
    try {
        authorized = location.state.authorized
    }
    catch {
        // pass
    }
    const [temp, setTemp] = useState("")

    const [data, setData] = useState({
        "username": "",
        "workout_tracker": []
    })



    const date = new Date()
    if (!authorized) {
        return (
            <>
                <div style = {{ textAlign:'center' }}>
                    <div style={{ color: "red" }}>Access Denied: &nbsp;Sorry, you are not authorized to view this page! </div>
                    <button type="submit" onClick={(e) => {
                        navigate("/register")
                    }}>Create account</button> &nbsp;or &nbsp;
                    <button type="submit" onClick={(e) => {
                        navigate("/login")
                    }}>Return to login page</button>
                </div>
            </>
        )
    }



    return (
        <>
            <div class="container">
                <div class="row">
                    <div class="col-6">
                        <button onClick={(e) => {
                            const temp = { ...data }
                            temp.workout_tracker.push(getDefaultWorkout())
                            temp.username = location.state.username
                            setData(temp)
                        }}>Add Workout</button>
                    </div>
                    <div style={{ textAlign: "right" }} class="col">
                        Welcome back, {location.state.username} &nbsp;
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <button type="submit" onClick={sendData}
                        >Save Changes</button>
                    </div>

                    <div style={{ textAlign: "right" }} class="col">
                        <button onClick={(e) => {
                            authorized = false
                            navigate("/login")
                        }}>Log Out</button>
                    </div>
                    <div class="col-6">
                        <button type="submit" onClick={getData}
                        >Get Previous</button>
                    </div>
                </div>
                


                {data.workout_tracker.map((workout, count) => {
                    return (
                        <WorkoutTracker

                            removeWorkout={(e, workoutDataID) => {
                                const temp = { ...data }
                                let currentObj = null

                                for (let index = 0; index < data.workout_tracker.length; index++) {
                                    const element = temp.workout_tracker[index];
                                    if (element.id === workoutDataID) {
                                        currentObj = index
                                    }
                                }
                                // if (!currentObj) throw "currentObj is not defined"
                                
                                temp.workout_tracker.splice(currentObj, 1)

                                setData(temp)
                            }}

                            addExercise={(e, workoutDataID) => {
                                const temp = { ...data }
                                let currentObj = null

                                for (let index = 0; index < data.workout_tracker.length; index++) {
                                    const element = temp.workout_tracker[index];
                                    if (element.id === workoutDataID) {
                                        currentObj = element
                                    }
                                }
                                if (!currentObj) throw "currentObj is not defined"

                                currentObj.exercises.push({
                                    "title": "Unnamed Exercise",
                                    "id": uuidv4(),
                                    "sets": []
                                })
                                setData(temp)

                            }}
                            removeExercise={(e, exerciseID, workoutData) => {
                                const temp = { ...data }
                                workout = workoutData
                                let currentObj = null

                                for (let index = 0; index < workout.exercises.length; index++) {
                                    const element = workout.exercises[index];
                                    if (element.id == exerciseID) {
                                        currentObj = index
                                    }
                                }
                                workout.exercises.splice(currentObj, 1)
                                setData(temp)
                            }}

                            addSet={(e, exerciseID, workoutData) => {
                                const temp = { ...data }
                                workout = workoutData
                                let currentObj = null

                                for (let index = 0; index < workout.exercises.length; index++) {
                                    const element = workout.exercises[index];
                                    if (element.id == exerciseID) {
                                        currentObj = element
                                    }
                                }

                                currentObj.sets.push({
                                    "id": uuidv4(),
                                    "weight": "",
                                    "reps": "",
                                    "notes": ""
                                })

                                setData(temp)
                            }}

                            removeSet={(e, setID, exerciseID, workoutData, exercises) => {
                                const temp = { ...data }
                                let currentObj = null

                                for (let index = 0; index < exercises.sets.length; index++) {
                                    const element = exercises.sets[index];
                                    if (element.id == setID) {
                                        currentObj = index
                                    }
                                }

                                exercises.sets.splice(currentObj, 1)
                                setData(temp)

                            }}
                            workoutTitle={(e, workoutDataID) => {
                                const temp = { ...data }
                                const value = e.target.value
                                let currentObj = null

                                for (let index = 0; index < data.workout_tracker.length; index++) {
                                    const element = temp.workout_tracker[index];
                                    if (element.id === workoutDataID) {
                                        currentObj = element
                                    }
                                }
                                if (!currentObj) throw "currentObj is not defined"

                                currentObj.title = value
                                setData(temp)

                            }}

                            exerciseTitle={(e, exerciseID, exercises) => {
                                const temp = { ...data }
                                const value = e.target.value
                                let currentObj = null

                                exercises.title = value

                                setData(temp)

                            }}

                            handleSet={(e, sets, setID, exerciseID, exercises) => {
                                const temp = { ...data }
                                const { name, value } = e.target
                                sets[name] = value

                                setData(temp)
                            }}

                            date={date}
                            workoutData={workout}
                            workoutDataID={workout.id}
                            count={count + 1}
                        />
                    )
                })}
                <Testing />
            </div>
        </>
    );
}

export default Workout;


/* 


*/