"use client";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { useState } from "react";

function Search({ teamId }: { teamId: string }) {
  const navigation = useRouter();
  const [query, setQuery] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (query) navigation.push(`/app/t/${teamId}/search/${query}`);
      }}
    >
      <Input
        className="w-72"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        value={query}
      />
    </form>
  );
}

export default Search;
