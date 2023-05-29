import { ProductType } from "@/types/ProductType"
import formatPrice from "@/util/PriceFormat"
import Image from "next/image"

export default function Product({name, price, image} : ProductType){
    return(
        <div>
            <Image src={image} alt={name} width={270} height={270}/>
            <h1>{name}</h1>
            <h2>{price !== null ? formatPrice(price) : 'N/A'}</h2>
        </div>
    )
}