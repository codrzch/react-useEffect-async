import "./styles.css";
import React, { useState, useEffect } from "react";

export default function App() {
  const [resourceType, setResourceType] = useState("posts");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    async function fetchData() {
      try {
        let response = await fetch(`https://jsonplaceholder.typicode.com/${resourceType}`, { signal });
        if (response.ok) {
          let data = await response.json();
          setItems(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();

    return () => {
      controller.abort();
    };
  }, [resourceType]);

  return (
    <>
      <div>
        <button onClick={() => setResourceType("posts")}>Posts</button>
        <button onClick={() => setResourceType("users")}>Users</button>
        <button onClick={() => setResourceType("comments")}>Comments</button>
      </div>
      <h1>{resourceType}</h1>
      {items.map((item) => {
        return <pre key={item.id}>{JSON.stringify(item)}</pre>;
      })}
    </>
  );
}
