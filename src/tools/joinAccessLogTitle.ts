export const joinAccessLogTitle = (requestId: string, method: string, path: string) => {
  return `${requestId} ${method} ${path}`;
};
