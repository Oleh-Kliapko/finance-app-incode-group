import { Typography } from "antd";
import { Component, ErrorInfo, ReactNode } from "react";
import { toast } from "react-toastify";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Caught an error:", error, errorInfo);
    toast.error("Something wrong. Reload this page please");
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <Typography.Title
          level={1}
          style={{ textAlign: "center", marginTop: "40%" }}
        >
          Something wrong. Reload this page please
        </Typography.Title>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
