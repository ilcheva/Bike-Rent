import { v4 as uuidv4 } from "uuid";
import Header from "./Components/Header";
import { useState } from "react";
import {
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import "./App.css";
import InputForm from "./Components/Form";
import calculatePrice from "./Components/Calculations/PriceCalc";
import TotalPrice from "./Components/Calculations/TotalPrice";
import dayjs from "dayjs";
import UserData from "./Components/LocalStorage/UserData";

function App() {
    const [data, setData] = useState<any[]>(UserData());

    const addData = (value: {}) => {
        console.log(value);
        setData([...data, value]);
    };

    return (
        <div className="App">
            <Grid container justifyContent="center" spacing={1}>
                <Grid item xs={12}>
                    <Header />
                </Grid>
                <Grid item xs={12} sm={6} md={4} mt={2}>
                    <InputForm addData={addData} />
                </Grid>
                <Grid item xs={12} sm={6} md={6} mt={2}>
                    <TableContainer
                        sx={{
                            minWidth: 550,
                            maxWidth: 600,
                            borderRadius: "10px",
                            justifyContent: "space-around",
                            boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                        }}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Price</TableCell>
                                    <TableCell align="center">
                                        Start Date
                                    </TableCell>
                                    <TableCell align="center">
                                        End Date
                                    </TableCell>
                                    <TableCell align="center">
                                        Date Added
                                    </TableCell>
                                    <TableCell align="center">Period</TableCell>
                                    <TableCell align="right">
                                        Total Price
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((el) => (
                                    <TableRow
                                        key={uuidv4()}
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                { border: 0 },
                                        }}>
                                        <TableCell component="th" scope="row">
                                            {el.price_per_day}
                                        </TableCell>
                                        <TableCell align="center">
                                            {dayjs(el.from).format(
                                                "DD.MM.YYYY"
                                            )}
                                        </TableCell>
                                        <TableCell align="center">
                                            {dayjs(el.to).format("DD.MM.YYYY")}
                                        </TableCell>
                                        <TableCell align="center">
                                            {dayjs(el.added).format(
                                                "DD.MM.YYYY"
                                            )}
                                        </TableCell>
                                        <TableCell align="center">
                                            {dayjs(el.to).diff(
                                                dayjs(el.from),
                                                "days",
                                                true
                                            ) + 1}
                                        </TableCell>
                                        <TableCell align="right">
                                            {calculatePrice(
                                                el.from,
                                                el.to,
                                                el.price_per_day,
                                                data
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell rowSpan={3} />
                                    <TableCell
                                        variant="head"
                                        colSpan={4}
                                        align="right">
                                        Total:
                                    </TableCell>
                                    <TableCell variant="head" align="right">
                                        {TotalPrice(data)}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
