export interface BrazilianState {
  code: string;
  name: string;
  cities: string[];
}

export const brazilianStates: BrazilianState[] = [
  {
    code: 'AC',
    name: 'Acre',
    cities: ['Rio Branco', 'Cruzeiro do Sul', 'Sena Madureira', 'Tarauacá', 'Feijó']
  },
  {
    code: 'AL',
    name: 'Alagoas',
    cities: ['Maceió', 'Arapiraca', 'Palmeira dos Índios', 'Rio Largo', 'Penedo']
  },
  {
    code: 'AP',
    name: 'Amapá',
    cities: ['Macapá', 'Santana', 'Laranjal do Jari', 'Oiapoque', 'Mazagão']
  },
  {
    code: 'AM',
    name: 'Amazonas',
    cities: ['Manaus', 'Parintins', 'Itacoatiara', 'Manacapuru', 'Coari']
  },
  {
    code: 'BA',
    name: 'Bahia',
    cities: ['Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Camaçari', 'Juazeiro', 'Ilhéus', 'Itabuna', 'Lauro de Freitas']
  },
  {
    code: 'CE',
    name: 'Ceará',
    cities: ['Fortaleza', 'Caucaia', 'Juazeiro do Norte', 'Maracanaú', 'Sobral', 'Crato', 'Itapipoca']
  },
  {
    code: 'DF',
    name: 'Distrito Federal',
    cities: ['Brasília', 'Taguatinga', 'Ceilândia', 'Gama', 'Planaltina', 'Sobradinho']
  },
  {
    code: 'ES',
    name: 'Espírito Santo',
    cities: ['Vitória', 'Vila Velha', 'Cariacica', 'Serra', 'Cachoeiro de Itapemirim', 'Linhares']
  },
  {
    code: 'GO',
    name: 'Goiás',
    cities: ['Goiânia', 'Aparecida de Goiânia', 'Anápolis', 'Rio Verde', 'Luziânia', 'Águas Lindas de Goiás']
  },
  {
    code: 'MA',
    name: 'Maranhão',
    cities: ['São Luís', 'Imperatriz', 'São José de Ribamar', 'Timon', 'Caxias', 'Codó']
  },
  {
    code: 'MT',
    name: 'Mato Grosso',
    cities: ['Cuiabá', 'Várzea Grande', 'Rondonópolis', 'Sinop', 'Tangará da Serra', 'Cáceres']
  },
  {
    code: 'MS',
    name: 'Mato Grosso do Sul',
    cities: ['Campo Grande', 'Dourados', 'Três Lagoas', 'Corumbá', 'Ponta Porã', 'Naviraí']
  },
  {
    code: 'MG',
    name: 'Minas Gerais',
    cities: ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora', 'Betim', 'Montes Claros', 'Ribeirão das Neves', 'Uberaba', 'Governador Valadares', 'Ipatinga']
  },
  {
    code: 'PA',
    name: 'Pará',
    cities: ['Belém', 'Ananindeua', 'Santarém', 'Marabá', 'Parauapebas', 'Castanhal', 'Abaetetuba']
  },
  {
    code: 'PB',
    name: 'Paraíba',
    cities: ['João Pessoa', 'Campina Grande', 'Santa Rita', 'Patos', 'Bayeux', 'Sousa']
  },
  {
    code: 'PR',
    name: 'Paraná',
    cities: ['Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa', 'Cascavel', 'São José dos Pinhais', 'Foz do Iguaçu', 'Colombo']
  },
  {
    code: 'PE',
    name: 'Pernambuco',
    cities: ['Recife', 'Jaboatão dos Guararapes', 'Olinda', 'Caruaru', 'Petrolina', 'Paulista', 'Cabo de Santo Agostinho']
  },
  {
    code: 'PI',
    name: 'Piauí',
    cities: ['Teresina', 'Parnaíba', 'Picos', 'Piripiri', 'Floriano', 'Campo Maior']
  },
  {
    code: 'RJ',
    name: 'Rio de Janeiro',
    cities: ['Rio de Janeiro', 'São Gonçalo', 'Duque de Caxias', 'Nova Iguaçu', 'Niterói', 'Belford Roxo', 'São João de Meriti', 'Campos dos Goytacazes', 'Petrópolis', 'Volta Redonda']
  },
  {
    code: 'RN',
    name: 'Rio Grande do Norte',
    cities: ['Natal', 'Mossoró', 'Parnamirim', 'São Gonçalo do Amarante', 'Macaíba', 'Ceará-Mirim']
  },
  {
    code: 'RS',
    name: 'Rio Grande do Sul',
    cities: ['Porto Alegre', 'Caxias do Sul', 'Pelotas', 'Canoas', 'Santa Maria', 'Gravataí', 'Viamão', 'Novo Hamburgo', 'São Leopoldo']
  },
  {
    code: 'RO',
    name: 'Rondônia',
    cities: ['Porto Velho', 'Ji-Paraná', 'Ariquemes', 'Vilhena', 'Cacoal', 'Rolim de Moura']
  },
  {
    code: 'RR',
    name: 'Roraima',
    cities: ['Boa Vista', 'Rorainópolis', 'Caracaraí', 'Alto Alegre', 'Mucajaí']
  },
  {
    code: 'SC',
    name: 'Santa Catarina',
    cities: ['Florianópolis', 'Joinville', 'Blumenau', 'São José', 'Criciúma', 'Chapecó', 'Itajaí', 'Lages']
  },
  {
    code: 'SP',
    name: 'São Paulo',
    cities: ['São Paulo', 'Guarulhos', 'Campinas', 'São Bernardo do Campo', 'Santo André', 'Osasco', 'Ribeirão Preto', 'Sorocaba', 'Santos', 'Mauá', 'São José dos Campos', 'Mogi das Cruzes', 'Diadema', 'Jundiaí', 'Piracicaba']
  },
  {
    code: 'SE',
    name: 'Sergipe',
    cities: ['Aracaju', 'Nossa Senhora do Socorro', 'Lagarto', 'Itabaiana', 'São Cristóvão']
  },
  {
    code: 'TO',
    name: 'Tocantins',
    cities: ['Palmas', 'Araguaína', 'Gurupi', 'Porto Nacional', 'Paraíso do Tocantins']
  }
];

export const getStateByCode = (code: string): BrazilianState | undefined => {
  return brazilianStates.find(state => state.code === code);
};

export const getCitiesByState = (stateCode: string): string[] => {
  const state = getStateByCode(stateCode);
  return state ? state.cities : [];
};
