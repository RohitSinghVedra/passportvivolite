import type { SurveyQuestion } from '../types';

export const surveyQuestions: SurveyQuestion[] = [
  {
    id: '1',
    question: {
      en: 'How do you currently commute to work/school?',
      pt: 'Como você atualmente se desloca para o trabalho/escola?'
    },
    options: [
      {
        value: 'car',
        label: { en: 'Personal car', pt: 'Carro próprio' },
        points: 1
      },
      {
        value: 'public',
        label: { en: 'Public transportation', pt: 'Transporte público' },
        points: 3
      },
      {
        value: 'bike',
        label: { en: 'Bicycle or walking', pt: 'Bicicleta ou caminhada' },
        points: 5
      },
      {
        value: 'remote',
        label: { en: 'Work/study from home', pt: 'Trabalho/estudo de casa' },
        points: 4
      }
    ],
    fact: {
      en: 'Public transport reduces CO2 emissions by up to 45% compared to individual cars.',
      pt: 'O transporte público reduz as emissões de CO2 em até 45% comparado a carros individuais.'
    }
  },
  {
    id: '2',
    question: {
      en: 'How often do you consume meat?',
      pt: 'Com que frequência você consome carne?'
    },
    options: [
      {
        value: 'daily',
        label: { en: 'Daily', pt: 'Diariamente' },
        points: 1
      },
      {
        value: 'few-times-week',
        label: { en: 'Few times a week', pt: 'Algumas vezes por semana' },
        points: 2
      },
      {
        value: 'weekly',
        label: { en: 'Once a week', pt: 'Uma vez por semana' },
        points: 3
      },
      {
        value: 'rarely',
        label: { en: 'Rarely or never', pt: 'Raramente ou nunca' },
        points: 5
      }
    ],
    fact: {
      en: 'Reducing meat consumption by 50% can lower your carbon footprint by 20%.',
      pt: 'Reduzir o consumo de carne em 50% pode diminuir sua pegada de carbono em 20%.'
    }
  },
  {
    id: '3',
    question: {
      en: 'How do you handle electronic waste?',
      pt: 'Como você lida com resíduos eletrônicos?'
    },
    options: [
      {
        value: 'trash',
        label: { en: 'Regular trash', pt: 'Lixo comum' },
        points: 1
      },
      {
        value: 'store',
        label: { en: 'Return to stores', pt: 'Devolvo às lojas' },
        points: 3
      },
      {
        value: 'recycle',
        label: { en: 'Specialized recycling', pt: 'Reciclagem especializada' },
        points: 5
      },
      {
        value: 'donate',
        label: { en: 'Donate or repair', pt: 'Doo ou conserto' },
        points: 4
      }
    ],
    fact: {
      en: 'Only 3% of electronic waste in Brazil is properly recycled.',
      pt: 'Apenas 3% do lixo eletrônico no Brasil é reciclado adequadamente.'
    }
  },
  {
    id: '4',
    question: {
      en: 'What\'s your approach to energy consumption?',
      pt: 'Qual é sua abordagem ao consumo de energia?'
    },
    options: [
      {
        value: 'no-attention',
        label: { en: 'I don\'t pay attention', pt: 'Não presto atenção' },
        points: 1
      },
      {
        value: 'sometimes',
        label: { en: 'Sometimes turn off lights', pt: 'Às vezes apago as luzes' },
        points: 2
      },
      {
        value: 'conscious',
        label: { en: 'Very conscious about usage', pt: 'Muito consciente sobre o uso' },
        points: 4
      },
      {
        value: 'renewable',
        label: { en: 'Use renewable energy', pt: 'Uso energia renovável' },
        points: 5
      }
    ],
    fact: {
      en: 'LED bulbs use 75% less energy than traditional incandescent bulbs.',
      pt: 'Lâmpadas LED usam 75% menos energia que lâmpadas incandescentes tradicionais.'
    }
  },
  {
    id: '5',
    question: {
      en: 'How do you handle plastic consumption?',
      pt: 'Como você lida com o consumo de plástico?'
    },
    options: [
      {
        value: 'no-change',
        label: { en: 'No special effort', pt: 'Nenhum esforço especial' },
        points: 1
      },
      {
        value: 'some-reduction',
        label: { en: 'Try to reduce sometimes', pt: 'Tento reduzir às vezes' },
        points: 2
      },
      {
        value: 'reusable',
        label: { en: 'Use reusable bags/bottles', pt: 'Uso sacolas/garrafas reutilizáveis' },
        points: 4
      },
      {
        value: 'zero-waste',
        label: { en: 'Actively avoid single-use plastic', pt: 'Evito ativamente plástico descartável' },
        points: 5
      }
    ],
    fact: {
      en: 'Brazil produces 11.3 million tons of plastic waste annually.',
      pt: 'O Brasil produz 11,3 milhões de toneladas de resíduos plásticos anualmente.'
    }
  },
  {
    id: '6',
    question: {
      en: 'How engaged are you with environmental issues?',
      pt: 'Qual seu engajamento com questões ambientais?'
    },
    options: [
      {
        value: 'not-interested',
        label: { en: 'Not particularly interested', pt: 'Não particularmente interessado' },
        points: 1
      },
      {
        value: 'aware',
        label: { en: 'Aware but not active', pt: 'Consciente mas não ativo' },
        points: 2
      },
      {
        value: 'active',
        label: { en: 'Actively seek information', pt: 'Busco informações ativamente' },
        points: 4
      },
      {
        value: 'advocate',
        label: { en: 'Advocate and educate others', pt: 'Defendo e educo outros' },
        points: 5
      }
    ],
    fact: {
      en: 'Environmental awareness has increased 67% among Brazilians in the last 5 years.',
      pt: 'A consciência ambiental aumentou 67% entre os brasileiros nos últimos 5 anos.'
    }
  },
  {
    id: '7',
    question: {
      en: 'What\'s your water usage approach?',
      pt: 'Qual é sua abordagem ao uso da água?'
    },
    options: [
      {
        value: 'unlimited',
        label: { en: 'Use without restriction', pt: 'Uso sem restrição' },
        points: 1
      },
      {
        value: 'moderate',
        label: { en: 'Moderate usage', pt: 'Uso moderado' },
        points: 3
      },
      {
        value: 'conservation',
        label: { en: 'Active conservation practices', pt: 'Práticas ativas de conservação' },
        points: 4
      },
      {
        value: 'rainwater',
        label: { en: 'Rainwater harvesting', pt: 'Coleta de água da chuva' },
        points: 5
      }
    ],
    fact: {
      en: 'Brazil has 12% of the world\'s fresh water but faces increasing scarcity in urban areas.',
      pt: 'O Brasil tem 12% da água doce mundial, mas enfrenta crescente escassez em áreas urbanas.'
    }
  },
  {
    id: '8',
    question: {
      en: 'How do you approach sustainable consumption?',
      pt: 'Como você aborda o consumo sustentável?'
    },
    options: [
      {
        value: 'buy-new',
        label: { en: 'Always buy new products', pt: 'Sempre compro produtos novos' },
        points: 1
      },
      {
        value: 'quality',
        label: { en: 'Buy quality items that last', pt: 'Compro itens de qualidade duráveis' },
        points: 3
      },
      {
        value: 'second-hand',
        label: { en: 'Often buy second-hand', pt: 'Frequentemente compro usado' },
        points: 4
      },
      {
        value: 'minimal',
        label: { en: 'Minimize consumption', pt: 'Minimizo o consumo' },
        points: 5
      }
    ],
    fact: {
      en: 'Extending product lifespan by just 1 year reduces environmental impact by 20%.',
      pt: 'Estender a vida útil de produtos em apenas 1 ano reduz o impacto ambiental em 20%.'
    }
  },
  {
    id: '9',
    question: {
      en: 'How involved are you in community environmental actions?',
      pt: 'Qual seu envolvimento em ações ambientais comunitárias?'
    },
    options: [
      {
        value: 'not-involved',
        label: { en: 'Not involved', pt: 'Não envolvido' },
        points: 1
      },
      {
        value: 'occasional',
        label: { en: 'Occasional participation', pt: 'Participação ocasional' },
        points: 2
      },
      {
        value: 'regular',
        label: { en: 'Regular participation', pt: 'Participação regular' },
        points: 4
      },
      {
        value: 'organize',
        label: { en: 'Organize community initiatives', pt: 'Organizo iniciativas comunitárias' },
        points: 5
      }
    ],
    fact: {
      en: 'Community-led environmental projects are 3x more likely to succeed long-term.',
      pt: 'Projetos ambientais liderados pela comunidade têm 3x mais chances de sucesso a longo prazo.'
    }
  },
  {
    id: '10',
    question: {
      en: 'What\'s your stance on climate technology adoption?',
      pt: 'Qual sua posição sobre adoção de tecnologias climáticas?'
    },
    options: [
      {
        value: 'not-interested',
        label: { en: 'Not interested in new tech', pt: 'Não interessado em novas tecnologias' },
        points: 1
      },
      {
        value: 'skeptical',
        label: { en: 'Skeptical but open', pt: 'Cético mas aberto' },
        points: 2
      },
      {
        value: 'early-adopter',
        label: { en: 'Early adopter of green tech', pt: 'Adotante precoce de tecnologia verde' },
        points: 4
      },
      {
        value: 'advocate',
        label: { en: 'Advocate for climate tech', pt: 'Defensor de tecnologia climática' },
        points: 5
      }
    ],
    fact: {
      en: 'Green technology adoption in Brazil has grown 156% since 2020.',
      pt: 'A adoção de tecnologia verde no Brasil cresceu 156% desde 2020.'
    }
  }
];