import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { reduxSesion } from "../redux/actions/reduxSesion";
import Business from "../classes/Business";
import utils from "../libs/utils/utils";

const TAG = "useCurrentBusiness";
export function useCurrentBusiness() {
  const [business, setBusiness] = useState<Business>(new Business(null, true));

  useSelector((store: any) => {
    try {
      const newBusiness: Business = store.reducerSesion.currentBusiness;
      if (!utils.objects.isEmpty(newBusiness)) {
        if (!newBusiness.isEmpty) {
          if (business.id !== newBusiness.id) {
            if (newBusiness instanceof Business) {
              setBusiness(newBusiness);
            } else {
              setBusiness(new Business(newBusiness));
            }
          }
        }
        return new Business(newBusiness);
      }
    } catch (error) {
      console.log(TAG, error);
    }
    return new Business(null);
  });

  return business;
}

export function useSetCurrentBusiness() {
  const dispatch = useDispatch();
  const callBack = useCallback(
    (Business: Business) => {
      dispatch(reduxSesion.setCurrentBusiness(Business));
    },
    [dispatch]
  );
  return callBack;
}
