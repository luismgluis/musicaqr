import { useCallback } from "react";
import { useNavigate } from "react-router";

export const useGoto = () => {
  const navigate = useNavigate();

  const login = useCallback(
    (parms: any = null) => {
      navigate("/login", { state: parms });
    },
    [navigate]
  );
  const loginCreate = useCallback(
    (parms: any = null) => {
      navigate("/loginCreate", { state: parms });
    },
    [navigate]
  );
  const home = useCallback(
    (parms: any = null) => {
      navigate("/home", { state: parms });
    },
    [navigate]
  );
  return {
    login,
    loginCreate,
    home,
  };
};
