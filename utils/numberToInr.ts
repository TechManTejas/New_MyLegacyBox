export const numberToInr = (number: number) => {

    const numberFormatter = new Intl.NumberFormat("en-IN")

    return numberFormatter.format(number)

}