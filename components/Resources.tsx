import React, { useState, useCallback, useEffect } from 'react';
import { findResources } from '../services/geminiService';
import type { Resource } from '../types';
import { ArticleIcon, SearchIcon, TagIcon } from './common/Icons';

const suggestionTopics = [
  'Dealing with parental expectations',
  'Competitive exam stress',
  'Adjusting to hostel life',
  'Improving sleep',
  'Building confidence',
  'Time management',
  'Homesickness',
  'Making new friends',
];

const CACHE_SIZE = 4;

// FIX: Using a named interface for props to resolve errors when passing the 'key' prop in a list.
interface ResourceCardProps {
  resource: Resource;
}

// FIX: Explicitly type ResourceCard as a React.FC to resolve errors when passing the 'key' prop in a list.
const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => (
  <a
    href={resource.uri}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-start gap-4 bg-card p-4 rounded-lg shadow-sm border border-gray-200 hover:border-primary hover:shadow-md transition-all group"
  >
    <div className="flex-shrink-0 bg-secondary text-primary p-3 rounded-lg">
        <ArticleIcon className="w-6 h-6" />
    </div>
    <div className="flex-1">
        <h3 className="text-lg font-semibold text-primary group-hover:underline">{resource.title}</h3>
        <p className="text-sm text-green-600 truncate">{resource.uri}</p>
    </div>
  </a>
);

const Resources: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resources, setResources] = useState<Resource[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [cache, setCache] = useState<Record<string, Resource[]>>({});
  const [cacheOrder, setCacheOrder] = useState<string[]>([]);
  
  const [featuredResources, setFeaturedResources] = useState<Resource[]>([]);
  const [isFetchingFeatured, setIsFetchingFeatured] = useState(true);

  useEffect(() => {
    const fetchFeaturedResources = async () => {
      setIsFetchingFeatured(true);
      try {
        const results = await findResources("stress management tips for college students");
        setFeaturedResources(results.slice(0, 5));
      } catch (e) {
        console.error("Could not fetch featured resources", e);
      } finally {
        setIsFetchingFeatured(false);
      }
    };
    fetchFeaturedResources();
  }, []);

  const handleSearch = useCallback(async (searchQuery: string) => {
    const trimmedQuery = searchQuery.trim().toLowerCase();
    if (!trimmedQuery) return;

    if (cache[trimmedQuery]) {
      setResources(cache[trimmedQuery]);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    setResources([]);

    try {
      const results = await findResources(trimmedQuery);
      setResources(results);

      if (results.length > 0) {
        setCache(prevCache => {
          const newCache = { ...prevCache, [trimmedQuery]: results };
          const newOrder = [trimmedQuery, ...cacheOrder.filter(q => q !== trimmedQuery)];
          
          if (newOrder.length > CACHE_SIZE) {
            const oldestQuery = newOrder.pop();
            if (oldestQuery) {
              delete newCache[oldestQuery];
            }
          }
          setCacheOrder(newOrder);
          return newCache;
        });
      } else {
        setError('No resources found for this topic. Try a different search.');
      }
    } catch (e) {
      setError('An error occurred while fetching resources. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [cache, cacheOrder]);

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };
  
  const onSuggestionClick = (topic: string) => {
    setQuery(topic);
    handleSearch(topic);
  }

  const isSearching = isLoading || resources.length > 0 || !!error;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-2">Resource Hub</h1>
      <p className="text-text-secondary mb-6">Find articles and tools for your mental well-being.</p>
      
      <form onSubmit={onSearchSubmit} className="relative flex items-center mb-6">
        <SearchIcon className="absolute left-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for topics like 'exam anxiety'..."
          className="w-full p-3 pl-10 bg-white border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
        />
        <button type="submit" className="absolute right-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-focus" disabled={isLoading}>
          {isLoading ? '...' : 'Search'}
        </button>
      </form>

      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {suggestionTopics.map(topic => (
            <button 
              key={topic} 
              onClick={() => onSuggestionClick(topic)} 
              className="flex items-center px-3 py-1 bg-secondary text-primary text-sm rounded-full hover:bg-secondary-focus transition-colors"
            >
              <TagIcon className="w-4 h-4 mr-1.5" />
              {topic}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {isSearching ? (
          <>
            <h2 className="text-xl font-bold text-text-primary pt-4 border-t">Search Results for "{query}"</h2>
            {isLoading && <p className="text-center text-text-secondary">Searching for resources...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            {resources.map((resource, index) => (
              <ResourceCard key={`search-${index}`} resource={resource} />
            ))}
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-text-primary pt-4 border-t">Featured Resources</h2>
            {isFetchingFeatured ? (
              <p className="text-center text-text-secondary">Loading featured resources...</p>
            ) : (
              featuredResources.length > 0 ? (
                featuredResources.map((resource, index) => (
                  <ResourceCard key={`featured-${index}`} resource={resource} />
                ))
              ) : (
                <p className="text-center text-text-secondary">Could not load featured resources.</p>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Resources;