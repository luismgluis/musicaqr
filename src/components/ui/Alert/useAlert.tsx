import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reduxGeneralValues } from "../../../redux/actions/reduxGeneralValues";

export type AlertType = {
  title?: string;
  body?: JSX.Element | string;
  buttons?: JSX.Element[];
  type?: "push" | "question";
  okButton?: string;
  noButton?: string;
  onClose?: (res: boolean) => void;
  enabled?: boolean;
};
export function useCustomAlert() {
  const [data, setData] = useState<AlertType>({
    title: "",
    body: "",
    type: "push",
    buttons: [],
    enabled: false,
  });
  const oldData = useRef<AlertType>({
    title: "",
    body: "",
    type: "push",
    buttons: [],
    enabled: false,
  });

  useSelector((store: any) => {
    try {
      const lng: AlertType = store.reducerGeneralValues.alertData;
      if (typeof lng !== "undefined") {
        if (lng !== null) {
          if (typeof lng.enabled === "undefined") {
            lng.enabled = true;
          }
          if (typeof lng.okButton === "undefined") {
            lng.okButton = "Ok";
          }

          if (
            oldData.current.enabled !== lng.enabled ||
            oldData.current.title !== lng.title
          ) {
            setData(lng);
          }
          oldData.current = lng;
        }
      }
      return lng;
    } catch (error) {}
    return 0;
  });

  return data;
}

export function useAlert() {
  const dispatch = useDispatch();
  const changeAlert = useCallback(
    (data: AlertType) => {
      dispatch(reduxGeneralValues.setAlertData(data));
    },
    [dispatch]
  );
  const info = useCallback(
    (data: AlertType | string) => {
      if (typeof data === "string") {
        data = { title: data };
      }
      changeAlert(data);
    },
    [changeAlert]
  );
  const error = useCallback(
    (data: AlertType | string) => {
      if (typeof data === "string") {
        data = { title: data };
      }
      changeAlert(data);
    },
    [changeAlert]
  );

  const toast = useCallback(
    (data: AlertType) => {
      changeAlert(data);
    },
    [changeAlert]
  );
  const loading = useCallback(
    (data: AlertType) => {
      changeAlert(data);
    },
    [changeAlert]
  );

  return {
    info,
    toast,
    loading,
    error,
  };
}
