// hooks/usePlanets.ts
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';

const fetchPlanets = async (page: number, search: string) => {
  const response = await axios.get(`https://swapi.dev/api/planets/?search=${search}&page=${page}`);

  console.log(response)
  return response.data;
};

export const usePlanets = (page: number, search: string) => {
  const options: UseQueryOptions<any, Error, any, (string | number)[]> = {
    queryKey: ['planets', page, search],
    queryFn: () => fetchPlanets(page, search),
    // keepPreviousData: true, // Mantém os dados anteriores enquanto carrega os novos
  };

  // Chamando o useQuery com as opções especificadas
  return useQuery(options);

};
