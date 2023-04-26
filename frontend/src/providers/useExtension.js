import { useState } from "react";
import NeutralinoExtensions from "../integration/NeutralinoExtensions";

/**
 *
 * @param {*} param0
 */
export function useExtension(name, event) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const doCall = async (params) => {
        setLoading(true);
        try {
            const response = await NeutralinoExtensions.call("js.neutralino." + name, event, { ...params });

            setData(response);
            setLoading(false);
            return response;
        } catch (error) {
            setError(error);
            setLoading(false);
            throw error;
        }
    };

    return { data, error, loading, doCall };
}
