import * as React from "react"
import { useState } from "react"
import { motion, useAnimation } from "../../src"

const style = {
    width: 100,
    height: 100,
    background: "red",
}
const stylea = {
    width: 50,
    height: 50,
    background: "blue",
    x: 100,
}

export const App = () => {
    const animation = useAnimation({
        default: { x: 0 },
        active: () => ({ x: 200, transition: { delayChildren: 0.3 } }),
    })

    const childPoses = useAnimation({
        default: { opacity: 0.2 },
        active: { opacity: 1 },
    })

    const [isActive, setActive] = useState(true)

    animation.start("active")

    return (
        <motion.div
            animate={animation}
            onClick={() => setActive(!isActive)}
            style={style}
            onDrag={(event, info) => {
                console.log(event, info)
            }}
        >
            <motion.button
                animate={childPoses}
                inherit
                style={stylea}
                type={"test"}
            />
            <motion.table cellPadding={10} />
        </motion.div>
    )
}
