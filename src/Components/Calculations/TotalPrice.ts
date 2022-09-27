import dayjs from 'dayjs';
import DataInterface from '../Types/Types';

let initv = {
    from: '',
    to: ''
}
export default function TotalPrice(periods: DataInterface[]) {

    let pricePerDay: { [key: string]: number } = {};
    console.log(periods)
    let earliest = periods.reduce(function (pre, cur) {
        return dayjs(pre.from) < dayjs(cur.from) ? pre : cur;
    }, initv);
    let last = periods.reduce(function (pre, cur) {
        return dayjs(pre.to) < dayjs(cur.to) ? cur : pre;
    });

    periods.sort((a, b) => a.added.localeCompare(b.added));
    periods.forEach((period) => {
        let date = dayjs(period.from);
        while (date <= dayjs(period.to)) {
            let dateStr = date.format("DD-MM-YYYY");

            pricePerDay[dateStr] = period.price_per_day;

            date = date.add(1, "day");
        }
    });

    let allPrice = 0;
    if (pricePerDay === null) {
        return allPrice;
    } else {

        let earliestDate = dayjs(earliest.from)
        while (earliestDate <= dayjs(last.to)) {
            console.log(earliestDate)
            let dateStr = earliestDate.format("DD-MM-YYYY");

            let currentPrice = 0

            if (dateStr in pricePerDay) {
                currentPrice = pricePerDay[dateStr]
            } else {
                currentPrice = 5;
                pricePerDay[dateStr] = currentPrice
                console.log('if', pricePerDay[dateStr])
            }

            allPrice += currentPrice;

            earliestDate = earliestDate.add(1, "day");
        }
    }
    console.log('totalprice', pricePerDay)
    console.log(allPrice)
    return allPrice;



}