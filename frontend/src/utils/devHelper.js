/**
 * Development helper for MotorMob
 * This file contains functions that are only used during development
 * to make testing and debugging easier.
 */

/**
 * Helper function to clear React's module cache in development
 * This forces React to reload modules from scratch
 * IMPORTANT: This should only be used during development
 */
export const clearModuleCache = () => {
  if (process.env.NODE_ENV !== 'development') {
    console.warn('clearModuleCache should only be used during development');
    return;
  }
  
  // This forces the page to do a full reload, bypassing React's cache
  window.location.reload();
};

/**
 * Instructions for developers
 * 
 * If you're experiencing issues with mock data not refreshing:
 * 
 * 1. Make changes to your mockData.js file
 * 2. Save the file
 * 3. Click the "Refresh" button on the page
 * 
 * If that doesn't work, you can:
 * 1. Add this to your browser console: 
 *    import('/src/utils/devHelper.js').then(m => m.clearModuleCache())
 * 2. Or press Ctrl+F5 to force a full browser refresh
 */
