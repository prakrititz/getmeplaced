import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    this.setState({ info });
    console.error('App crashed:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '2rem',
          background: '#0f172a',
          color: '#f1f5f9',
          minHeight: '100vh',
          fontFamily: 'monospace'
        }}>
          <h1 style={{ color: '#f87171', marginBottom: '1rem' }}>🔴 Render Error</h1>
          <p style={{ color: '#fbbf24', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            {this.state.error?.toString()}
          </p>
          <pre style={{
            background: '#1e293b',
            padding: '1rem',
            borderRadius: '8px',
            overflow: 'auto',
            fontSize: '0.75rem',
            color: '#94a3b8',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all'
          }}>
            {this.state.info?.componentStack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
