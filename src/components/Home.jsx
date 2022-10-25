import { Card, CardContent, Grid, TextField, Typography } from "@mui/material"
import axios from "axios";

import React, { Component, useEffect, useState }  from 'react';
import Poke from "./Poke";

const Home = () => {
    useEffect(() => {
        cargarPokemones();
    }, []);

    
    const [listado, setListado] = useState([]);
    const [finder, setFinder] = useState("");
    const [errors, setErrors] = useState(false);
    const [listadoAux, setListadoAux] = useState([]);
    const [count, setCount] = useState(1)
    const [listadoSelected, setListadoSelected] = useState([]);

    const [objetoPrueba, setObjetoPrueba] = useState({pokemon: '', pokemonDos: ''}); 
    const [buscador, setBuscador] = useState("");


    const arreglar = () =>{
        listado.sort((a,b) => {
        return a.name > b.name});
    }

    const arreglarPrincipio =(listado) => {
        let copiaListado = listado.sort((a,b) => a.name > b.name ? 1 : -1);
        return copiaListado;
    }


    function sumar(){
        let resultado = count +1;
        setCount(resultado)
    }

    const cargarPokemones = () => {
        axios.get("https://pokeapi.co/api/v2/pokemon?limit=151").then(
            (response) => {
                console.log(response.data.results);
                let datos = response.data.results;
                let ordenado = arreglarPrincipio(datos)

                setListado(ordenado);
            },
            (error) => {
                console.log(error);
            }
        );
        

    };
    const handleInputChange = (event)=> {
        setFinder(event.target.value);
    }
    const handleInputChangeDos = (event)=> {
        const {name, value} = event.target;
        setObjetoPrueba({...objetoPrueba,[name]: value});
        
    }
    useEffect(() => {
        if (finder.trim() !== ""){
            let result = listado.filter((item) => 
            item.name.toString().includes(finder.toString().trim())
            );

            if(result.lenght !== 0){
                errors && setErrors(false);
                setListadoAux(result);
            }else{
                setListadoAux([]);
                setErrors(true);
            }
            //setListadoAux(result);
        }
        console.log(finder);
    }, [finder]);
    let estilo = {backgroundColor: 'red'}

    const stack = (itemExterno) => {
        setListadoSelected((listadoSelected) => [...listadoSelected, itemExterno]);

        // let aux = [...listadoSelected, itemExterno];
        // setListadoSelected((listadoSelected) => arreglarPrincipio(aux));

        let result = listado.filter((item) => item.name !== itemExterno.name);
        setListado(result);

        let resultClon = listadoAux.filter((item) => item.name !== itemExterno.name);
        setListadoAux(resultClon);
    }

    const stack2 = (itemExterno) => {
        setListado((listado) => [...listado, itemExterno]);

        let result = listadoSelected.filter((item) => item.name !== itemExterno.name);
        setListadoSelected(result);
        arreglar();

        // let resultClon = listadoAux.filter((item) => item.name !== itemExterno.name);
        // setListadoAux(resultClon);
    }

    
    


    return (
        
        <Card>
            <CardContent>
                <TextField
                    error= {errors}
                    helperText={errors ? "hay error" : null}
                    fullWidth
                    label= "Pokemon"
                    name="pokemon"
                    type="text"
                    variant= "outlined"
                    value={finder}
                    onChange={handleInputChange}
                    >
                        
                </TextField>
                <Grid container spacing={1}>
                    <Grid item md={4}>
                        {listado.map((element, index) => (
                            <Poke pokemon= {element} dato= {element.name} key={index}></Poke>
                        ))}
                    </Grid>

                    {/* <Grid item md={4}>
                        
                        {finder && 
                        listadoAux.map((element, index) => (
                            <Poke 
                            pokemon= {element}
                            dato= {element.name} 
                            key={index} 
                            estilo={estilo}
                            funcion={stack}
                            ></Poke>
                        ))}
                    </Grid>
                    <Grid item md={4}>
                        {listadoSelected.map((element, index) => (
                            <Poke 
                            pokemon= {element} 
                            dato= {element.name} 
                            key={index}
                            funcion={stack2}
                            ></Poke>
                        ))}
                    </Grid> */}

                    <Grid item md={5}>
                        <TextField
                        sx={{mt:2}}
                        fullWidth
                        error= {errors}
                        helperText={errors && "hay error"}
                        label= "Pokemon"
                        name="pokemon"
                        type="text"
                        variant="outlined"
                        value={objetoPrueba.pokemon}
                        onChange={handleInputChangeDos}
                        ></TextField>
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

export default Home;