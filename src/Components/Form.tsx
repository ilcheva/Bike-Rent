import dayjs from "dayjs";
import { useFormik } from "formik";
import formValidation from "./Schemas";
import { Grid, TextField, Button, Stack } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
interface Props {
    addData: (value: {}) => void;
}
const InputForm = ({ addData }: Props) => {
    const formik = useFormik({
        initialValues: {
            price_per_day: '',
            from: null,
            to: null,
            added: dayjs(),
        },
        validationSchema: formValidation,
        onSubmit: (values, actions) => {
            actions.setSubmitting(false);
            const { price_per_day, from, to, added } = values;
            addData({
                price_per_day,
                from: dayjs(from).format(),
                to: dayjs(to).format(),
                added: dayjs(added).format(),
            });

            let data: {}[] = [];
            let stored = localStorage.getItem("data");
            if (stored === null) {
                data.push(values);
                localStorage.setItem("data", JSON.stringify(data));
            } else {
                data.push(...JSON.parse(stored), values);
                localStorage.setItem("data", JSON.stringify(data));
            }
            actions.resetForm();
        },
    });

    return (
        <Grid
            container
            sx={{
                maxWidth: 300,
                borderRadius: "10px",
                justifyContent: "space-around",
                boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
            }}>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2} my={3} mb={4}>
                    <Grid
                        item
                        xs={12}
                        sx={{ textAlign: "center", fontSize: "26px" }}>
                        Form
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Price for a day"
                            name="price_per_day"
                            variant="outlined"
                            value={formik.values.price_per_day}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.price_per_day &&
                                Boolean(formik.errors.price_per_day)
                            }
                            helperText={
                                formik.touched.price_per_day &&
                                formik.errors.price_per_day
                            }
                        />
                    </Grid>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Grid item xs={12}>
                            <DesktopDatePicker
                                minDate={null}
                                label="Start Date"
                                inputFormat="DD MM YYYY"
                                value={formik.values.from}
                                onChange={(value) =>
                                    formik.setFieldValue("from", value, true)
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        error={
                                            formik.touched.from &&
                                            Boolean(formik.errors.from)
                                        }
                                        helperText={
                                            formik.touched.from &&
                                            formik.errors.from
                                        }
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <DesktopDatePicker
                                minDate={null}
                                label="End Date"
                                inputFormat="DD MM YYYY"
                                value={formik.values.to}
                                onChange={(value) =>
                                    formik.setFieldValue("to", value, true)
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        error={
                                            formik.touched.to &&
                                            Boolean(formik.errors.to)
                                        }
                                        helperText={
                                            formik.touched.to &&
                                            formik.errors.to
                                        }
                                    />
                                )}
                            />
                        </Grid>
                    </LocalizationProvider>
                    <Grid item xs={12} alignItems="center">
                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            disabled={formik.isSubmitting}>
                            Submit
                        </Button>
                    </Grid>
                </Stack>
            </form>
        </Grid>
    );
};
export default InputForm;
