/**
 * this function format the price of the product in order to display it correctly
 * @param amount the product amount
 * @returns the formatted price
 */
const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
    }).format(amount / 100)
};

export default formatPrice;