export interface LogContext {
  requestId?: string;
  workflowId?: string;
  environment?: string;
  operation?: string;
  [key: string]: unknown;
}

export interface Logger {
  debug(message: string, context?: LogContext): void;
  info(message: string, context?: LogContext): void;
  warn(message: string, context?: LogContext): void;
  error(message: string, context?: LogContext): void;
}

export class StructuredLogger implements Logger {
  debug(message: string, context: LogContext = {}): void {
    this.write('debug', message, context);
  }

  info(message: string, context: LogContext = {}): void {
    this.write('info', message, context);
  }

  warn(message: string, context: LogContext = {}): void {
    this.write('warn', message, context);
  }

  error(message: string, context: LogContext = {}): void {
    this.write('error', message, context);
  }

  private write(level: string, message: string, context: LogContext): void {
    const payload = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...context,
    };

    // Placeholder for later integration with stdout, file, or telemetry.
    console.log(JSON.stringify(payload));
  }
}
