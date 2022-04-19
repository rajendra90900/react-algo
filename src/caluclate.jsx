import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import transactions from '../src/data.json';

export class CaluclateAmount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalAmount: 0,
            points: 0,
            transactionsData: transactions,
        };
    };

    componentDidMount() {
        this.totalAmount();
    }

    totalAmount = () => {
        const sum = this.state.transactionsData.reduce((acc, dataObj) => {
            return acc + dataObj.amount;
        }, 0);
        this.caluclatePoints(sum);
        const data = this.state.transactionsData.map(obj =>
            obj.id ? { ...obj, points: this.caluclatePoints(obj.amount) } : obj
        );
        this.setState({ totalAmount: sum, transactionsData: data }, () => this.caluclatePoints(sum));
    };

    caluclatePoints = (amount) => {
        let points;
        if (amount === 0 || amount <= 50) {
            points = 0;
            this.setState({ points });
            return 0;
        };
        if (amount >= 50 && amount <= 100) {
            points = amount - 50;
            this.setState({ points });
            return amount - 50;
        }
        if (amount > 100) {
            points = 50 + ((amount - 100) * 2);
            this.setState({ points });
            return points;
        }
        return;
    };

    caluclateAmountChange = (e, index, id) => {
        const updatedData = this.state.transactionsData.map(obj =>
            obj.id === id ? { ...obj, amount: parseInt(e.target.value) } : obj
        );
        this.setState({ transactionsData: updatedData }, () => this.totalAmount());
        this.totalAmount();
    };

    dateSelected = (month) => {
        let result;
        if (month) {
            const ed = new Date(`2022-${month}-31T00:00:00.000Z`).getTime();
            const sd = new Date(`2022-${month}-01T00:00:00.000Z`).getTime();
            result = transactions.filter(d => {
                var time = new Date(d.transaction_date).getTime();
                return (sd < time && time < ed);
            });

        } else {
            const ed = new Date(`2022-05-31T00:00:00.000Z`).getTime();
            const sd = new Date(`1900-05-01T00:00:00.000Z`).getTime();
            result = transactions.filter(d => {
                var time = new Date(d.transaction_date).getTime();
                return (sd < time && time < ed);
            });
        }
        this.setState({ transactionsData: result }, () => this.totalAmount());
    };
    render() {
        const { points } = this.state;
        return (
            <React.Fragment>
                <h2>Transaction Table</h2>
                <Stack direction="row" spacing={1} style={{ padding: 20 }}>
                    <Chip label="January" onClick={() => this.dateSelected('01')} />
                    <Chip label="Febuary" onClick={() => this.dateSelected('02')} />
                    <Chip label="March" onClick={() => this.dateSelected('03')} />
                    <Chip label="All Time" onClick={() => this.dateSelected()} />

                </Stack>
                <TableContainer component={Paper} style={{ padding: 20 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" sx={{ border: 1 }}>
                        <TableHead sx={{ border: 1 }}>
                            <TableRow sx={{ border: 1 }}>
                                <TableCell align="right" sx={{ border: 1 }}>Id</TableCell>
                                <TableCell align="right" sx={{ border: 1 }}>Date</TableCell>
                                <TableCell align="right" sx={{ border: 1 }}>Name</TableCell>
                                <TableCell align="right" sx={{ border: 1 }}>Email</TableCell>
                                <TableCell align="right" sx={{ border: 1 }}>Amount</TableCell>
                                <TableCell align="right" sx={{ border: 1 }}>Points</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.transactionsData.map((row, index) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ border: 2 }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="right" sx={{ border: 1 }}>{row.name}</TableCell>
                                    <TableCell align="right" sx={{ border: 1 }}>{row.transaction_date}</TableCell>
                                    <TableCell align="right" sx={{ border: 1 }}>{row.email}</TableCell>
                                    <TableCell align="right" sx={{ border: 1 }}>
                                        <TextField value={row.amount || 0} onChange={(value) => this.caluclateAmountChange(value, index, row.id)} />
                                    </TableCell>
                                    <TableCell align="right" sx={{ border: 1 }}>{row.points}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* <h3>Total Amount</h3> */}
                <h2 align="right">Total Points: {points}</h2>
            </React.Fragment>
        );
    }
};