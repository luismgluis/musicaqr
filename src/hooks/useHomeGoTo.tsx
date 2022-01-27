import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HomeCurrentScreen,
  HomeGotoType,
} from "../components/HomeCurrentScreen";
import { useAlert } from "../components/ui/Alert/useAlert";
import { reduxGeneralValues } from "../redux/actions/reduxGeneralValues";
import { useCurrentBusiness } from "./currentBusiness";

export function useHomeGoTo() {
  const [data, setData] = useState<HomeGotoType>({
    screen: "UsersScreen",
    name: "Usuarios",
    parms: null,
  });
  const oldData = useRef<HomeGotoType>({
    screen: "UsersScreen",
    name: "Usuarios",
    parms: null,
  });

  useSelector((store: any) => {
    try {
      const lng: HomeGotoType = store.reducerGeneralValues.homeGoTo;
      if (typeof lng !== "undefined") {
        if (lng !== null) {
          if (
            oldData.current.screen !== lng.screen ||
            oldData.current.parms !== lng.parms
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

export function useSetHomeGoTo() {
  const dispatch = useDispatch();
  const currentBusiness = useCurrentBusiness();
  const alert = useAlert();
  return useCallback(
    (screen: HomeCurrentScreen, name: string, parms: any = null) => {
      if (currentBusiness.isEmpty && screen !== "BusinessScreen") {
        alert.info({
          title: "No tan rapido..",
          body: "Debes escoger una empresa primero",
          okButton: "De acuerdo",
          enabled: true,
        });
        return;
      }
      dispatch(reduxGeneralValues.setHomeNavigation(screen, name, parms));
    },
    [dispatch, alert, currentBusiness]
  );
}
