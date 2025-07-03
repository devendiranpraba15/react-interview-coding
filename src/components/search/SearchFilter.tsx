"use client";

import { useState, useRef, useEffect } from "react";

type ResultObj = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export default function SearchFilter() {
  const [lists, setLists] = useState<ResultObj[]>([]);
  const [filter, setFilter] = useState<string>("");
  const searchRef = useRef<HTMLInputElement | null>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const fetchResult = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (!response.ok) {
        throw new Error("failed to fetch data");
        return;
      }
      const result: ResultObj[] = await response.json();
      const filtered = result.filter((user) =>
        user.name.toLowerCase().includes(filter.toLowerCase())
      );

      setLists(filtered);
    };

    fetchResult();
  }, [filter]);

  const handleChange = () => {
    const search = searchRef.current?.value || "";

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      setFilter(search);
    }, 1000);
  };

  return (
    <>
      <input ref={searchRef} type="text" onChange={handleChange}></input>
      <button>search</button>
      <ul>
        {lists?.map((list) => {
          return (
            <li key={list.id}>
              <strong>{list.name}</strong> — {list.email}
            </li>
          );
        })}
      </ul>
    </>
  );
}
