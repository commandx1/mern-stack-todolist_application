import { useState, useCallback, useRef, useEffect } from 'react'

const useHttpClient = () => {
    const [isLoading, setisLoading] = useState(false);
    const [error, setError] = useState();
    const [open, setOpen] = useState(false);

    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(
       async (url, method = "GET", body = null, headers = {}) => {
        setisLoading(true);
        const httpAbortController = new AbortController();
        activeHttpRequests.current.push(httpAbortController);
        try{
            const response = await fetch(url, {
                method,
                body,
                headers,
                signal: httpAbortController.signal
            });
            const responseData = await response.json();

            activeHttpRequests.current = activeHttpRequests.current.filter(
                reqCtrl => reqCtrl !== httpAbortController
                );

                  if(!response.ok){
                    throw new Error(responseData.message);
                  }
                  setisLoading(false);
                  return responseData;
        } catch(err) {
            setError(err.message);
            setisLoading(false);
            setOpen(true);
            throw err;  
        }
    }, []);

        const clearError = () => {
            setError(null);
            setOpen(false);
        }

        useEffect((() => {
            return () => {
                activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
            }
        }),[])


    return { isLoading, error, open, sendRequest, clearError } //isLoading=isLoading
}

export default useHttpClient;
