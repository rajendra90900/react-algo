import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import transactions from '../src/data.json';
import { Button, TextField, Checkbox } from '@mui/material';

export const TableMovement = () => {
    const [transactionsData, setTransactions] = useState(transactions);
    const updateValue = (name, value, id) => {
        let data;
        if (name === 'email') {
            data = transactionsData.map(obj =>
                obj.id === id ? { ...obj, "email": value.target.value } : obj
            );
        };
        setTransactions(data);
    };
    const handleChange = (e, i, id) => {
        const data = transactionsData.map(obj =>
            obj.id === id ? { ...obj, "complete": i !== -1, "isEditable": i } : obj
        );
        setTransactions(data);
    };

    const deleteRow = (id, index) => {
        console.log(transactionsData.filter(object => {
            return object.id !== id;
        }));
        console.log('1111', transactionsData);
        setTransactions(transactionsData.filter(object => {
            return object.id !== id;
        }));
    };

    // useEffect(() => {
    //     // Update the document title using the browser API
    //     setTransactions(transactionsData);
    //   });
    const addRow = () => {
        console.log('123', transactionsData);
        const data = {
            "id": 1,
            "name": "deere",
            "email": "Sat@mail.com",
            "adderss": "South street",
            "transaction_date": "2022-01-02T00:00:00.000Z",
            "amount": 80,
            "points": 0,
            "isEditable": false,
            "complete": false
        };
        transactionsData.push(data)
    }
    return (
        <React.Fragment>
            <h2>Transaction Table</h2>
            <TableContainer component={Paper} style={{ padding: 20 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" sx={{ border: 1 }}>
                    <TableHead sx={{ border: 1 }}>
                        <TableRow sx={{ border: 1 }}>
                            <TableCell align="right" sx={{ border: 1 }}>Id</TableCell>
                            <TableCell align="right" sx={{ border: 1 }}>Date</TableCell>
                            <TableCell align="right" sx={{ border: 1 }}>Name</TableCell>
                            <TableCell align="right" sx={{ border: 1 }}>Email</TableCell>
                            <TableCell align="right" sx={{ border: 1 }}>Delete</TableCell>
                            <TableCell align="right" sx={{ border: 1 }}>Edit</TableCell>
                            <TableCell align="right" sx={{ border: 1 }}>Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactionsData.map((row, index) => (
                            <TableRow
                                key={row.id}
                                sx={{ border: 2 }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right" sx={{ border: 1 }}>{row.name}</TableCell>
                                <TableCell align="right" sx={{ border: 1 }}>{row.transaction_date}</TableCell>
                                <TableCell align="right" sx={{ border: 1 }}>
                                    <TextField
                                        id="standard-basic"
                                        label="Standard"
                                        variant="standard"
                                        value={row.email}
                                        disabled={row.isEditable}
                                        onChange={(e) => updateValue('email', e, row.id)}
                                    />
                                </TableCell>
                                <TableCell align="right" sx={{ border: 1 }}>
                                    <Button
                                        onClick={() => deleteRow(row.id, index)}
                                        disabled={row.isEditable}
                                    >
                                        <DeleteForeverIcon />
                                    </Button>
                                </TableCell>
                                <TableCell align="right" sx={{ border: 1 }}>
                                    <Button disabled={row.isEditable} onClick={() => alert()}><EditIcon /></Button>
                                </TableCell>
                                <TableCell>
                                    <Checkbox
                                        checked={row.checked}
                                        onChange={(e, i) => handleChange(e, i, row.id)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button onClick ={() => addRow()}>Add Row</Button>
        </React.Fragment>
    );
};