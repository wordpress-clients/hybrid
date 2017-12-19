import moment from 'moment';

export function getNavParamsFromItem(type: String, item: any) {
    const date = moment(item.date);
    return {
        type,
        id: item.id,
        slug: item.slug,
        year: date.format('YYYY'),
        month: date.format('MM'),
        day: date.format('DD')
    }
}