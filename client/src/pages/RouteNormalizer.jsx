import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RouteNormalizer() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;

    // force lowercase routes
    const lower = path.toLowerCase();

    if (path !== lower) {
      navigate(lower, { replace: true });
    }
  }, [location.pathname]);

  return null;
}

export default RouteNormalizer;