"use client";

import * as React from "react";
import { VennState } from "../../types";
import { Venn } from "./Venn";

export function RenderForState() {
  const [state, setState] = React.useState<VennState | null>(null);
  React.useEffect(() => {
    let hash = window.location.hash;
    let encodedState = hash.substring(1);
    let decodedState = atob(encodedState);
    let bucket = JSON.parse(decodedState);
    let s: VennState = {
      title: bucket[0],
      conclusion: bucket[1],
      entries: bucket.slice(2).map((title: string) => ({ title }))
    };
    setState(s);
  }, []);

  if (state) {
    return <Venn state={state} />;
  } else {
    return null;
  }
}
