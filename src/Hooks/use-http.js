import { useState, useCallback } from "react";

const useHttp = (requestConfig, applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.requestConfig : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? requestConfig.body : null,
      });

      if (!response.ok) {
        throw new Error("Request Failed");
      }

      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
      // console.log(error);
    }
    setIsLoading(false);
  }, []);
  return {
    error,
    isLoading,
    sendRequest,
  };
};
export default useHttp;
