import React from "react";
import cities from "../lib/city.list.json";
import Link from "next/link";
import { useState } from "react";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const onChange = (e) => {
    const { value } = e.target;
    setQuery(value);

    let matchingCities = [];

    if (value.length > 3) {
      for (let city of cities) {
        if (matchingCities.length >= 5) {
          break;
        }
        const match = city.name.toLowerCase().startsWith(value.toLowerCase());

        if (match) {
          const cityData = {
            ...city,
            slug: `${city.name.toLowerCase().replace(/ /g, "-")}-${city.id}`,
          };
          matchingCities.push(cityData);
        }
      }
    }
    return setResults(matchingCities);
  };

  return (
    <div>
      <div className="search">
        <input type="text" value={query} onChange={onChange} />

        {query.length > 3 && (
          <ul>
            {results.length > 0 ? (
              results.map((city) => (
                <li key={city.slug}>
                  <Link href={`/location/${city.slug}`}>
                    <a>
                      {city.name}
                      {city.state ? `, ${city.state}` : ""}
                      <span>({city.country})</span>
                    </a>
                  </Link>
                </li>
              ))
            ) : (
              <li>
                <div className="search__no-results">No results found</div>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
