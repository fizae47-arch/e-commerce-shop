
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../server";

export default function ActivationPage() {
  const { activation_token } = useParams(); // from URL /activation/:activation_token
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(""); // ✅ store backend message

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post(`${server}/user/activation`, {
            activationToken: activation_token, // ✅ match backend field name
          });
          console.log(res.data.message);
          setMessage(res.data.message); // ✅ show success message
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
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: "100vw" }}>
      {error ? (
        <p style={{ color: "red" }}>{message || "Your token is invalid or has expired."}</p>
      ) : (
        <p style={{ color: "green" }}>{message || "Your account has been activated successfully!"}</p>
      )}
    </div>
  );
}
