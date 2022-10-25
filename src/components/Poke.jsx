import { Button, Card, CardActions, CardContent, TextField } from "@mui/material";
import React, { Component }  from 'react';

const Poke = ({pokemon,estilo=null, funcion = null}) => {
    return(
        
        <Card sx={estilo}>
            <CardContent>
                {pokemon.name}
            </CardContent>
            <CardActions>
                {/* {prueba === "true" ? "hola" : "chao"} */}
                {funcion && <Button onClick={() => funcion(pokemon)}>accion </Button>}
                {/* {funcion ? <Button onClick={() => funcion(pokemon)}>accion </Button>: null} */}
            </CardActions>
        </Card>
    );
}
export default Poke;