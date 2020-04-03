import { getBookTips } from '../../../repos/book';
const getTips = (value) => {
    return getBookTips(value)
}
export default getBookTips;