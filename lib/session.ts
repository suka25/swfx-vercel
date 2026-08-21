// Session store - Single source of truth
export const sessions: Record<string, any> = {};

export function getSession(token: string) {
  return sessions[token] || null;
}

export function setSession(token: string, data: any) {
  sessions[token] = data;
}

export function deleteSession(token: string) {
  delete sessions[token];
}

export function getAllSessions() {
  return sessions;
}

export function hasSession(token: string): boolean {
  return !!sessions[token];
}
