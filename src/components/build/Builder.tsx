"use client";

import Link from "next/link";
import * as React from "react";
import { VennEntry, VennState } from "../../types";
import { Venn } from "../view/Venn";
import { useRouter } from "next/navigation";

const MAX_ENTRIES = 6;

export function Builder() {
  const router = useRouter();

  const [state, setState] = React.useState<VennState>({
    title: "My Venn Diagram",
    conclusion: "Cool stuff",
    entries: [
      {
        title: "Entry 1"
      },
      {
        title: "Entry 2"
      }
    ]
  });

  const openView = () => {
    let bucket = [state.title, state.conclusion, ...state.entries.map((e) => e.title)];
    let encoded = btoa(JSON.stringify(bucket));
    router.push("/v#" + encoded);
  };

  const setTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      title: e.target.value
    });
  };

  const setConclusion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      conclusion: e.target.value
    });
  };

  const setEntryProp = (index: number, prop: keyof VennEntry, e: React.ChangeEvent<HTMLInputElement>) => {
    let entries = state.entries;
    entries[index][prop] = e.target.value;
    setState({
      ...state,
      entries
    });
  };

  const addEntry = () => {
    let entries = state.entries;

    if (entries.length < MAX_ENTRIES) {
      entries.push({
        title: "Entry " + (entries.length + 1)
      });
      setState({
        ...state,
        entries
      });
    }
  };

  const removeEntry = (index: number) => {
    let entries = state.entries;
    entries.splice(index, 1);
    setState({
      ...state,
      entries
    });
  };

  return (
    <div className="builder">
      <nav>
        <h1>Build a Venn</h1>

        <div className="field">
          <label>Title</label>
          <input type="text" value={state.title} onChange={setTitle} />
        </div>

        <div className="field">
          <label>Conclusion</label>
          <input type="text" value={state.conclusion} onChange={setConclusion} />
        </div>

        {state.entries.map((entry, i) => (
          <div key={i} className="entry">
            <input className="title" type="text" value={entry.title} onChange={(e) => setEntryProp(i, "title", e)} />
            <button className="remove" onClick={() => removeEntry(i)} disabled={state.entries.length < 3}>
              X
            </button>
          </div>
        ))}

        <button onClick={addEntry} disabled={state.entries.length >= MAX_ENTRIES}>
          + New entry
        </button>

        <div style={{ marginTop: "64px" }}>
          <button onClick={openView}>View</button>
        </div>
      </nav>
      <article>
        <Venn state={state} />
      </article>
    </div>
  );
}

function ColorCube({ color }: { color: string }) {
  return (
    <div className="cube" style={{ border: "1px solid black", width: 26, height: 26, backgroundColor: color }}></div>
  );
}
