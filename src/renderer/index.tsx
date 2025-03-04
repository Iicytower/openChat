import './globalStyles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Chat from './components/Chat';

const App = () => (
  <div style={{ display: 'flex', alignItems: "center", flexDirection: 'row' }}>
    <Chat />
  </div>
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
