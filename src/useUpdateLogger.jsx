import { useEffect } from "react";

export default function useUpdaterLogger(value) {
    useEffect(() => {
        console.log(value)
    }, [value])
}