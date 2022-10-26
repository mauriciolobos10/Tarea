import { Card, CardContent, Grid, TextField, Typography } from "@mui/material"
import axios from "axios";

import React, { Component, useEffect, useState }  from 'react';
import Perro from "./Perro";
import Poke from "./Poke";

const Home2 = () => {
    useEffect(() => {
        cargarImagenes();
    }, []);

    
    const [listado, setListado] = useState([]);
    const [finder, setFinder] = useState("");
    const [errors, setErrors] = useState(false);
    const [cancelados, setCancelados] = useState([]);
    const [aceptados, setAceptados] = useState([]);
    const [cargando, setCargando] = useState();

    const [objetoPrueba, setObjetoPrueba] = useState({perro: ''}); 


    const cargarImagenes = () => {
        //console.log("hola");
        setCargando(true); 
        console.log("verdadero");
        axios.get("https://dog.ceo/api/breeds/image/random").then(
            (response) => {
                //console.log(response.data);

                setObjetoPrueba(response.data);
                setCargando(false);
                console.log("falso");
                //console.log('"'+ response.data.message +'"');
            },
            (error) => {
                console.log(error);
            }
        );
        

    };
    const estadoBoton = (event)=> {
        //setCargando(true);
    }
    const handleInputChange = (event)=> {
        setFinder(event.target.value);
    }
    const handleInputChangeDos = (event)=> {
        const {name, value} = event.target;
        setObjetoPrueba({...objetoPrueba,[name]: value});
        
    }
    const stackCancelados = (itemExterno) => {
        setCancelados((cancelados) => [...cancelados, itemExterno]);
        cargarImagenes();
    }
    
    let estilo = {backgroundColor: 'red'}



    return (
        
        <Card>
            <CardContent>
                
                <Grid container spacing={1}>
                    <Grid item md={5}>
                        {cancelados.map((element, index) => (
                            <Perro 
                                perro= {element} 
                            ></Perro>
                        ))}
                    </Grid>

                    <Grid item md={5}>
                    
                        <Perro perro= {objetoPrueba.message} funcion={stackCancelados} estadoBoton={cargando}></Perro>
                            
                    </Grid>
        
                    
                
                    
                </Grid>
                {/* {listado.map((element, index) => (
                    <Poke dato= {element.name}/>
                    //</Card><Typography > {element.name}</Typography>
                    
                ))} */}
                
            </CardContent>        
        </Card>
    );
}

export default Home2;