import { SearchParamsType } from "@/types/SearchParamstype"
import formatPrice from "@/util/PriceFormat"
import { deepStrictEqual } from "assert"
import Image from "next/image"
import AddCart from "./AddCart"

export default async function Product({searchParams}: SearchParamsType){
    return(
        <div className="flex flex-col items-center justify-between gap-24 text-gray-700 lg:flex-row">
            <Image className="w-96" src={searchParams.image} alt={searchParams.name} width={300} height={300}/>
            <div className="font-medium text-gray-700">
                <h1 className="text-2xl py-2">{searchParams.name}</h1>
                <p className="py-2">{searchParams.description}</p>
                <p className="py-2">{searchParams.features}</p>
            
                <div className="flex gap-2">
                    <p className="font-bold text-pink-700">{searchParams.unit_amount && formatPrice(searchParams.unit_amount)}</p>
                </div>

                <AddCart {...searchParams}/>
            </div>
        </div>
    )
}