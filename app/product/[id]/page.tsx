import { SearchParamsType } from "@/types/SearchParamstype";
import formatPrice from "@/util/PriceFormat";
import Image from "next/image";
import AddCart from "./AddCart";

/**
 * The product informations page
 * @param productSearched the product to display
 * @returns the product informations page
 */
export default async function Product({searchParams}: SearchParamsType){
    return(
        <div className="flex flex-col items-center justify-between gap-24 lg:flex-row">
            <Image className="w-96 rounded-lg" src={searchParams.image} alt={searchParams.name} width={300} height={300} priority={true}/>
            <div className="font-medium">
                <h1 className="text-2xl py-2">{searchParams.name}</h1>
                <p className="py-2">{searchParams.description}</p>
                <p className="py-2">{searchParams.features}</p>
            
                <div className="flex gap-2">
                    <p className="font-bold text-primary">{searchParams.unit_amount && formatPrice(searchParams.unit_amount)}</p>
                </div>

                <AddCart 
                    id={searchParams.id} 
                    name={searchParams.name} 
                    image={searchParams.image}
                    unit_amount={searchParams.unit_amount}
                    quantity={searchParams.quantity}/>
            </div>
        </div>
    )
}