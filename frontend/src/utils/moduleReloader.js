/**
 * Helper function to force reimport of a module to get the latest changes
 * Useful for development purposes to ensure changes to mock data are reflected immediately
 * @param {string} modulePath - The path to the module to reload
 * @returns {Promise<any>} - The freshly imported module
 */
export const reloadModule = async (modulePath) => {
  // In development mode, we can use this trick to force a module reload
  if (process.env.NODE_ENV === 'development') {
    // Delete the module from the cache to force a reload
    try {
      // This is a workaround for webpack's module caching
      const timestamp = new Date().getTime();
      const module = await import(`${modulePath}?t=${timestamp}`);
      return module;
    } catch (error) {
      console.error(`Error reloading module ${modulePath}:`, error);
      // Fallback to normal import if the cache-busting approach fails
      return import(modulePath);
    }
  }
  
  // In production, just return the normal import
  return import(modulePath);
};
