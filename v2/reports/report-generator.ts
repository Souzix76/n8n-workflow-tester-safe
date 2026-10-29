export interface ReportArtifact {
  format: 'json' | 'markdown' | 'html' | 'junit';
  content: string;
}

export interface ReportContext {
  suiteName: string;
  environment: string;
  passed: boolean;
  summary: string;
  results: Array<{ name: string; passed: boolean; message: string }>;
}
