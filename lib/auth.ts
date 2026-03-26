export const USERS = [
  { username: "admin", password: "geheime-karten-2026", displayName: "Admin" },
  { username: "lernuser", password: "bio-geo-geschichte", displayName: "Lernuser" },
  { username: "Lara1610", password: "LernenIstSuper", displayName: "Lara1610" }
] as const;

export function authenticate(username: string, password: string) {
  return USERS.find(
    (user) => user.username === username.trim() && user.password === password
  );
}
