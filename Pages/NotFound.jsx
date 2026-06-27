import { useNavigate } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <h1>Page Non Existent</h1>
      <p>The page you've searched for does not exist in this universe.</p>
      <button onClick={() => navigate("/")}>Go Home</button>
    </div>
  );
}

export default NotFound;
