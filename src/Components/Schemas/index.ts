import dayjs from 'dayjs'
import * as yup from 'yup';

const formValidation = yup.object().shape({
    price_per_day: yup
        .number()
        .typeError("Must be a number")
        .positive("Must be greater than zero")
        .required("Required"),
    from: yup.date().nullable().required("Required"),
    to: yup
        .date()
        
        .nullable()
        .when("from", (from, schema) =>
            dayjs(from).isValid()
                ? schema.min(from, "End date can't be before start date")
                : schema
        )
        .required("Required"),
    added: yup.date().max(dayjs()),
})
export default formValidation;