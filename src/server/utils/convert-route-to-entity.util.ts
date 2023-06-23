const mapping: Record<string, string> = {
  companies: 'company',
  'performance-evaluations': 'performance_evaluation',
  tasks: 'task',
  'time-entries': 'time_entry',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
