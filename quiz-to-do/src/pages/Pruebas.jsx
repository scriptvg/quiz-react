import React from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from '../components/ui/NavBar';
import Footer from '../components/ui/Footer';
import ListaTareas from '../components/ListaTareas';
import FormularioTarea from '../components/FormularioTarea';
import ContadorTareas from '../components/contadortareas';
import { useAuth } from '../services/Auth';
import taskCalls from '../services/taskCalls';
import { DataGrid } from '@mui/x-data-grid';
import Swal from 'sweetalert2';
import { Grid } from 'lucide-react';

function Pruebas() {
  const rows = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
  ];

  const columns = [
    { field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
  ];

  return (
    <>
      <div style={{ height: 300, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
      <div>
        <h3>GridRowsProp</h3>
        <pre>{JSON.stringify(rows, null, 2)}</pre>
      </div>
      <div>
        <h3>GridColDef</h3>
        <pre>{JSON.stringify(columns, null, 2)}</pre>
      </div>
    </>
  );
}

export default Pruebas;
