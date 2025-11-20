// Export du module

// client/src/features/tags/index.js
export { useTags } from './hooks/useTags.js';
export { TagsContext } from './context/TagsContext.jsx';
export { default as TagsDisplay } from './components/TagsDisplay.jsx';

// Export par défaut pour compatibilité
export { default } from './components/TagsDisplay';
