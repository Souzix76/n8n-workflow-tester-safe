export interface ReportSection {
  title: string;
  content: Record<string, unknown>;
}

export interface ExecutionReport {
  summary: {
    status: 'pass' | 'fail' | 'warning';
    score: number;
    environment: string;
  };
  sections: ReportSection[];
}

export class ReportGenerator {
  static fromExecution(report: ExecutionReport): ExecutionReport {
    return report;
  }

  static markdown(report: ExecutionReport): string {
    return [
      '# Workflow Report',
      '',
      `- Status: ${report.summary.status}`,
      `- Score: ${report.summary.score}`,
      `- Environment: ${report.summary.environment}`,
      '',
      ...report.sections.map((section) => `## ${section.title}\n\n${JSON.stringify(section.content, null, 2)}`),
    ].join('\n');
  }
}
