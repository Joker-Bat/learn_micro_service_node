import axios from "axios";
import { useState, useCallback } from "react";

export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = useCallback(async () => {
    try {
      setErrors(null);

      const response = await axios.request({
        method,
        url,
        data: body,
      });

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Oops...</h4>
          <ul className="my-0">
            {err.response.data.errors.map((error, index) => (
              <li key={index}>{error.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  }, [body.email, body.password]);

  return { doRequest, errors };
};
