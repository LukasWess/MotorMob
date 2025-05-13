# Working with Mock Data in MotorMob

This guide explains how to effectively work with mock data during development.

## Understanding Mock Data Flow

1. Mock data is stored in `src/data/mockData.js`
2. Components import data from this file (either directly or via services)
3. When you update mock data, you need to make sure components re-fetch the latest data

## Using the Refresh Button

Each component that uses mock data now has a **Refresh** button that will:

1. Clear any cached data
2. Re-fetch the latest mock data from `mockData.js`
3. Update the UI with the new data

## Development Tools

We've added development tools to make working with mock data easier:

1. **Dev Tools Panel** - Located in the bottom-right corner of the app in development mode
   - Use the "Clear Cache & Reload" button for a full refresh

2. **Time Indicators** - Components now show when they last fetched data

3. **Manual Refresh Options** - Added to components that use mock data

## Troubleshooting

If you're making changes to mockData.js but not seeing them reflected:

1. **Save All Files** - Make sure all your changes are saved
2. **Click Refresh** - Use the refresh button in the component
3. **Clear Cache** - Use the Dev Tools panel's "Clear Cache & Reload" button
4. **Hard Refresh** - Press Ctrl+F5 in your browser

## For More Complex Changes

If you're making more complex changes to mock data structure:

1. Stop the development server
2. Make your changes
3. Restart the server

This ensures that all modules are freshly loaded with your changes.
