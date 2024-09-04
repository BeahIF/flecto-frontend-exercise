import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FiArrowLeft } from 'react-icons/fi';

const fetchPlanetDetails = async (name: string) => {
  console.log(name)
  const response = await axios.get(`https://swapi.dev/api/planets/?search=${name}`);
  console.log("response")
  const planetData: Planet = response.data.results[0];

  // return response.data.results[0];

  const residentsRequests = planetData.residents.map((url: string) => axios.get(url));
  const residentsResponses = await Promise.all(residentsRequests);
  const residents = residentsResponses.map(response => response.data);
  
  // Buscar os detalhes dos filmes
  const filmsRequests = planetData.films.map((url: string) => axios.get(url));
  const filmsResponses = await Promise.all(filmsRequests);
  const films = filmsResponses.map(response => response.data);
  
  // Retornar os dados do planeta junto com residentes e filmes
  return {
    ...planetData,
    residents,
    films
  };
};

const PlanetDetails = () => {
  const router = useRouter();
  const { name } = router.query;

  
  const { data, error, isLoading } = useQuery({
    queryKey: ['planet', name],
    queryFn: () => fetchPlanetDetails(name as string),
    enabled: !!name, // Executa a query apenas quando `name` estiver disponível
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading planet details</p>;

  return (
    <div className="planet-detail-container">
      <button className="back-button" onClick={() => router.push('/')}>        <FiArrowLeft />
      </button>

      <div className="planet-card-detail">
        <h2>{data?.name}</h2>
        <div className="detail-grid">
          <p><strong>Rotation Period:</strong> {data?.rotation_period}</p>
          <p><strong>Orbital Period:</strong> {data?.orbital_period}</p>
          <p><strong>Diameter:</strong> {data?.diameter}</p>
          <p><strong>Climate:</strong> {data?.climate}</p>
          <p><strong>Gravity:</strong> {data?.gravity}</p>
          <p><strong>Terrain:</strong> {data?.terrain}</p>
          <p><strong>Surface Water:</strong> {data?.surface_water}</p>
          <p><strong>Population:</strong> {data?.population}</p>
          <p><strong>Created:</strong> {data?.created}</p>
          <p><strong>Edited:</strong> {data?.edited}</p>
        </div>
        <div className="residents">
          <h3>Residents:</h3>
          <ul>
            {data?.residents?.length  ? (
              data?.residents.map((resident: Resident, index: number) => (
                <li key={index}>{resident.name}</li>
              ))
            ) : (
              <p>No residents available.</p>
            )}
          </ul>
        </div>
        <div className="films">
          <h3>Films:</h3>
          <ul>
            {data?.films?.length  ? (
              data?.films.map((film: Film, index: number) => (
                <li key={index}>{film.title}</li>
              ))
            ) : (
              <p>No films available.</p>
            )}
          </ul>
        </div>
      </div>
      </div>
  );
};

export default PlanetDetails;
