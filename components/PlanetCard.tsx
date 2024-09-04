import { useRouter } from 'next/router';

interface PlanetCardProps {
  planet: {
    name: string;
    climate: string;
    population: string;
    terrain: string;
  };
}

const PlanetCard = ({ planet }: PlanetCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/planetDetail?name=${planet.name}`);
  };

  return (
    <div className="planet-card" onClick={handleClick}>
      <h3>{planet.name}</h3>
      <p>Climate: {planet.climate}</p>
      <p>Population: {planet.population}</p>
      <p>Terrain: {planet.terrain}</p>
    </div>
  );
};

export default PlanetCard;
