// declara o ano da primeira temporada
export const minSeasonYear = 1950;

// pontos máximos por temporadas
const maxPoins1950Between1960 = 8;
const maxPoins1961Between1990 = 9;
const maxPoins1991Between2009 = 10;
const maxPointsLatest = 25;

// exceções

// a pontuação foi dobrada na ultima corrida do ano de 2014, fazendo a pontuação máxima subir para 50
const season2014 = 50;

// função verifica a pontuação máxima de acordo com o ano da temporada
export const getMaxPoints = (year) => {
  const seasonsPoints = {
    [year >= 1950 && year <= 1960]: maxPoins1950Between1960,
    [year >= 1961 && year <= 1990]: maxPoins1961Between1990,
    [year >= 1991 && year <= 2009]: maxPoins1991Between2009,
    [year >= 2010 && year != 2014]: maxPointsLatest,
    [year == 2014]: season2014,
  };

  return seasonsPoints?.true + 2;
};
