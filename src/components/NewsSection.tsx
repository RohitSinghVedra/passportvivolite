import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, RefreshCw, Newspaper } from 'lucide-react';
import { NewsService, NewsArticle } from '../services/newsService';
import { useLanguage } from '../hooks/useLanguage';

export const NewsSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadNews = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const newsData = await NewsService.getBrazilianSustainabilityNews();
      setNews(newsData);
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  const handleRefresh = () => {
    loadNews(true);
  };

  const handleNewsClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-600/30"
      >
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
          <span className="ml-3 text-gray-400">
            {language === 'en' ? 'Loading latest news...' : 'Carregando últimas notícias...'}
          </span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-600/30"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Newspaper className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-semibold text-white">
            {language === 'en' ? 'Latest Sustainability News' : 'Últimas Notícias de Sustentabilidade'}
          </h3>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="p-2 text-gray-400 hover:text-emerald-400 transition-colors disabled:opacity-50"
          title={language === 'en' ? 'Refresh news' : 'Atualizar notícias'}
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* News List */}
      <div className="space-y-4">
        {news.slice(0, 3).map((article, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-gray-700/30 rounded-lg p-4 hover:bg-gray-700/50 transition-all duration-200 cursor-pointer border border-gray-600/20"
            onClick={() => handleNewsClick(article.url)}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h4 className="text-sm font-medium text-white mb-2 line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-xs text-gray-400 mb-2 line-clamp-2">
                  {article.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-emerald-400 font-medium">
                    {article.source}
                  </span>
                  <span className="text-xs text-gray-500">
                    {NewsService.formatDate(article.publishedAt)}
                  </span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-500 flex-shrink-0 mt-1" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* View More Link */}
      <div className="mt-4 pt-4 border-t border-gray-600/30">
        <button
          onClick={() => window.open('https://news.google.com/search?q=sustentabilidade+brasil&hl=pt-BR', '_blank')}
          className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
        >
          {language === 'en' ? 'View more news' : 'Ver mais notícias'}
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </motion.div>
  );
};
