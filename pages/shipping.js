// import { Button } from 'bootstrap'
import { Table, Modal, ModalBody, ModalFooter, ModalHeader, Button, Container } from 'reactstrap';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import React, { Component } from 'react'
import axios from 'axios'
import styles from '../styles/Home.module.css'

const url = "http://localhost:3001/api/shipping"

export default class Shipping extends Component {

    state = {
        shippings: []
    }

    getContainers = () => {
        axios.get(url + "/shippings").then(response => {
            console.log("ESTA ES LA DATA ", response.data.ok);
            this.setState({ shippings: response.data.ok })
        }).catch(err => {
            console.log(err);
        })
    }

    componentDidMount() {
        this.getContainers();
    }

    render() {
        return (
            <Container className={styles.container}>
                <br></br>
                <Button color="primary">Agregar Envio</Button>
                <br></br>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Origen</th>
                            <th>Destino</th>
                            <th>Fecha envio</th>
                            <th>Fecha arribo estimada</th>
                            <th>Fecha arribo real</th>
                            <th>Acciones</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.state.shippings.map((elemento, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{elemento.destino_inicial}</td>
                                    <td>{elemento.destino_final}</td>
                                    <td>{elemento.fecha_envio}</td>
                                    <td>{elemento.fecha_estimada_envio}</td>
                                    <td>{elemento.fecha_arribo}</td>
                                    <td>
                                        <div className="row">
                                            <div className="col-2">
                                                <button className="btn btn-primary">

                                                    <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                                                    <span> Editar</span>
                                                </button>
                                            </div>

                                            <div className="col-2">
                                                <button className="btn btn-primary ">
                                                    <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                                                    <span> Eliminar</span>
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </Container>
        )
    }
}