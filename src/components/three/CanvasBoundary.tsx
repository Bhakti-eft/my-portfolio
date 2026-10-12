import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  fallback: ReactNode;
  children: ReactNode;
}

/** If a WebGL scene fails (lost context, driver issue), show the static fallback instead of a blank area. */
export class CanvasBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) console.warn('3D scene failed, using fallback.', error, info);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
