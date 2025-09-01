export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
}

export class NewsService {
  private static readonly API_KEY = '48a37799910e472dbdb38043fcb2a53a';
  private static readonly BASE_URL = 'https://newsapi.org/v2';

  static async getBrazilianSustainabilityNews(): Promise<NewsArticle[]> {
    try {
      const response = await fetch(
        `${this.BASE_URL}/everything?` +
        `q=sustentabilidade+brasil+clima&` +
        `language=pt&` +
        `sortBy=publishedAt&` +
        `pageSize=5&` +
        `apiKey=${this.API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      
      const data = await response.json();
      return data.articles.map((article: any) => ({
        title: article.title,
        description: article.description,
        url: article.url,
        publishedAt: article.publishedAt,
        source: article.source.name
      }));
    } catch (error) {
      console.error('Error fetching news:', error);
      return this.getMockNews();
    }
  }

  private static getMockNews(): NewsArticle[] {
    return [
      {
        title: "Startups verdes brasileiras atraíram R$ 850 milhões em investimentos em 2023",
        description: "O setor de startups sustentáveis no Brasil registrou crescimento de 45% em investimentos, com foco em energia renovável e tecnologias climáticas.",
        url: "https://example.com/news1",
        publishedAt: new Date().toISOString(),
        source: "Sustentabilidade Brasil"
      },
      {
        title: "Nova lei de carbono zero aprovada em São Paulo",
        description: "A capital paulista se compromete a atingir neutralidade de carbono até 2050, com investimentos em transporte público elétrico.",
        url: "https://example.com/news2",
        publishedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        source: "Clima Hoje"
      },
      {
        title: "Amazônia registra menor desmatamento em 10 anos",
        description: "Dados do INPE mostram redução de 23% no desmatamento da Amazônia, resultado de políticas ambientais mais rigorosas.",
        url: "https://example.com/news3",
        publishedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        source: "Ambiente Brasil"
      },
      {
        title: "Empresas brasileiras lideram ranking de sustentabilidade",
        description: "Cinco empresas brasileiras estão entre as 100 mais sustentáveis do mundo, segundo relatório da Corporate Knights.",
        url: "https://example.com/news4",
        publishedAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        source: "Sustentabilidade Corporativa"
      },
      {
        title: "Energia solar cresce 40% no Nordeste brasileiro",
        description: "Região nordestina lidera expansão da energia solar no país, com novos parques solares gerando empregos verdes.",
        url: "https://example.com/news5",
        publishedAt: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
        source: "Energia Renovável"
      }
    ];
  }

  static formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Agora mesmo';
    if (diffInHours < 24) return `${diffInHours}h atrás`;
    if (diffInHours < 48) return 'Ontem';
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} dias atrás`;
    
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}
