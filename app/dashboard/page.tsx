import { getServerSession } from "next-auth"; // used to get the actual user
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Order, PrismaClient } from "@prisma/client";
import formatPrice from "@/util/PriceFormat";
import Image from "next/image";

// everytime a user visit this page, we revalidate it(means that we do a refresh to get the right data)
export const revalidate = 0;

const fetchOrders = async() => {
    const prisma = new PrismaClient();
    const userSession = await getServerSession(authOptions);

    if(!userSession) return null;

    const orders = await prisma.order.findMany({
        where: {
            userId: userSession?.user?.id,
            status: "complete"
        },
        include: {
            products: true
        }
    });
    return orders;
}


export default async function Dashboard(){
    const orders = await fetchOrders();
    
    
    if(orders === null) return <div>Veuillez vous connecter !</div>
    if(orders.length === 0) return <div>Aucune commande effectuée !</div>

    return (
        <div>
            <h1>Mes commandes</h1>
            <div className="font-medium">
                {orders.map((order) => (
                    <div key={order.id} className="rounded-lg p-8 my-12 bg-base-200">
                        <h2 className="text-xs font-medium">Référence de la commande: {order.id}</h2>
                        <p className="text-xs">
                            Statut: 
                            <span className={`${order.status === "complete" ? "bg-teal-500" : "bg-orange-500"} text-white text-xs py-1 px-2 rounded-md mx-2`}>{order.status}</span>
                        </p>
                        <p>Date: {order.createdDate.toISOString().replace("T", " ")}</p>
                        <p className="font-medium">Total: {formatPrice(order.amount)}</p>
                        <div className="text-sm">
                            {order.products.map((product) => (
                                <div className="py-2" key={product.id}>
                                    <h2 className="py-2">{product.name}</h2>
                                    <div className="flex items-center gap-4">
                                        <Image src={product.image!} width={36} height={36} alt={product.name}/>
                                        <p>{formatPrice(product.unit_amount)}</p>
                                        <p>Quantité: {product.quantity}</p>
                                    </div>
                                </div>

                            ))}

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}