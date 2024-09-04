import { useState } from 'react';
import { usePlanets } from '../hooks/usePlanets'
import PlanetCard from '../components/PlanetCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
const HomePage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { data, isLoading, error } = usePlanets(page, search);

  const totalPages = data ? Math.ceil(data.count / 10) : 1; // 10 é o número de itens por página retornados pela API

  return (
    <div className="container">
      <header className="header">
        <h1>Star Wars Planets</h1>
        <SearchBar onSearch={(value) => setSearch(value)} />
      </header>
      <main className="main-content">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        <div className="planet-grid">
          {data &&
            data.results.map((planet) => (
              <PlanetCard key={planet.name} planet={planet} />
            ))}
        </div>
        <Pagination
          currentPage={page}
          totalPages={totalPages || 1}
          onPageChange={(page) => setPage(page)}
        />
      </main>
    </div>
  );
};

export default HomePage;
