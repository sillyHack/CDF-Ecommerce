import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import lottieOrder from "@/public/lottie-order.json";

export default function OrderAnimation(){
    return (
        <div className="flex flex-col items-center justify-center mt-24 p-12">
            <motion.h1 initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.5}}>
                Préparation de la commande ✨
            </motion.h1>
            <Player src={lottieOrder} autoplay loop/>
        </div>
    );
}