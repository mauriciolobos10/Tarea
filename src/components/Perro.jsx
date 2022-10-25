import { Button, Card, CardActions, CardContent, TextField } from "@mui/material";
import React, { Component }  from 'react';

const Perro = ({perro,estilo=null, funcion = null,estadoBoton=null}) => {
    return(
        
        <Card sx={estilo}>
            <CardContent>
            <img
                    src={perro}
                    alt="DOG"
                    width="500" height="300" 
                />
            </CardContent>
            
            
            <CardActions>
                {/* {prueba === "true" ? "hola" : "chao"} */}
                {funcion && <Button disabled={estadoBoton} onClick={() => funcion(perro)} loading={true}>Rechazar </Button>}
                {/* {funcion ? <Button onClick={() => funcion(pokemon)}>accion </Button>: null} */}
                
            </CardActions>
            
        </Card>
    );
}
export default Perro;