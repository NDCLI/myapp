import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

const posthogKey = import.meta.env.VITE_POSTHOG_KEY;

if (posthogKey) {
  posthog.init(posthogKey, {
    api_host: import.meta.env.VITE_POSTHOG_HOST ?? 'https://us.i.posthog.com',
    person_profiles: 'identified_only',
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {posthogKey ? (
      <PostHogProvider client={posthog}><App /></PostHogProvider>
    ) : (
      <App />
    )}
  </React.StrictMode>,
)
