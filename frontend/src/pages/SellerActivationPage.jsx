import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../server";

export default function SellerActivationPage() {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const hasRun = useRef(false);

  useEffect(() => {
    if (activation_token && !hasRun.current) {
      hasRun.current = true;

      const activationEmail = async () => {
        try {
          const res = await axios.post(
            `${server}/shop/activation`,
            { activation_token },
            { withCredentials: true },
          );
          setMessage(res.data.message);
          setError(false);
        } catch (error) {
          console.log(error.response?.data?.message || error.message);
          setMessage(error.response?.data?.message || "Activation failed");
          setError(true);
        }
      };
      activationEmail();
    }
  }, [activation_token]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      {error ? (
        <p style={{ color: "red" }}>
          {message || "Your token is invalid or has expired."}
        </p>
      ) : (
        <p style={{ color: "green" }}>
          {message || "Your account has been activated successfully!"}
        </p>
      )}
    </div>
  );
}
