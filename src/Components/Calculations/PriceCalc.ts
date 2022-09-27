import dayjs from "dayjs";
import DataInterface from "../Types/Types";

function calculatePrice(startDate: string, endDate: string, defaultPrice: number, periods: DataInterface[]) {

    let pricePerDay: { [key: string]: number } = {};

    periods.sort((a, b) => a.added.localeCompare(b.added));
    periods.forEach((period) => {
        let date = dayjs(period.from);
        while (date <= dayjs(period.to)) {
            let dateStr = date.format("DD-MM-YYYY");
            pricePerDay[dateStr] = period.price_per_day;

            date = date.add(1, "day");
        }
    });

    let price = 0;
    let date = dayjs(startDate);
    while (date <= dayjs(endDate)) {
        let dateStr = date.format("DD-MM-YYYY");

        let currentPrice = defaultPrice;
        if (dateStr in pricePerDay) {
            currentPrice = pricePerDay[dateStr]
        }

        price += currentPrice;

        date = date.add(1, "day");
    }


    return price
}
export default calculatePrice;


