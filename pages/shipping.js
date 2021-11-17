import { useContext } from "react";
import { useRouter } from "next/router";
import { Store } from "../utils/Store";
import React from "react";

export default function Shipping() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  if (!userInfo) {
    //if userInfo does not exist
    router.push("/login?redirect=/shipping"); //
  }

  return (
    <>
      <div>Shipping page</div>
    </>
  );
}
