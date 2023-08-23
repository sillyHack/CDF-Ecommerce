import { ProductType } from "@/types/ProductType";
import formatPrice from "@/util/PriceFormat";
import Image from "next/image";
import Link from "next/link";

export default function Product({id, name, unit_amount, image, description, metadata} : ProductType){
    const {features} = metadata;
    
    return(
        <Link href={{pathname: `/product/${id}`, query: { name, image, unit_amount, id, description, features }}}>
            <div>
                <Image src={image} alt={name} width={300} height={300} className="w-full h-80 object-cover rounded-lg" priority={true}/>
                <div className="font-medium py-2">
                    <h1>{name}</h1>
                    <h2 className="text-sm text-pink-700">{unit_amount && formatPrice(unit_amount)}</h2>
                </div>
            </div>
        </Link>
    );
}