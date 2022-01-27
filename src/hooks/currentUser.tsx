import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { reduxSesion } from "../../src/redux/actions/reduxSesion";
import User from "../classes/User";
import utils from "../libs/utils/utils";

const TAG = "useCurrentUser";
export function useCurrentUser() {
  const [user, setUser] = useState<User>(new User(null, true));

  useSelector((store: any) => {
    try {
      const newUser: User = store.reducerSesion.currentUser;
      if (!utils.objects.isEmpty(newUser)) {
        if (!newUser.isEmpty) {
          if (user.id !== newUser.id) {
            if (newUser instanceof User) {
              setUser(newUser);
            } else {
              setUser(new User(newUser));
            }
          }
        }
        return new User(newUser);
      }
    } catch (error) {
      console.log(TAG, error);
    }
    return new User(null);
  });

  return user;
}

export function useSetCurrentUser() {
  const dispatch = useDispatch();
  const callBack = useCallback(
    (user: User) => {
      dispatch(reduxSesion.setCurrentUser(user));
    },
    [dispatch]
  );
  return callBack;
}
