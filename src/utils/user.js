const USER_KEY = "foto-owl-user";

const names = ["Fox", "Panda", "Owl", "Tiger", "Koala", "Wolf"];
const colors = ["#ef4444", "#3b82f6", "#22c55e", "#a855f7", "#f97316"];

export function getUser() {
  const saved = localStorage.getItem(USER_KEY);
  if (saved) return JSON.parse(saved);

  const user = {
    id: crypto.randomUUID(),
    name:
      "User-" + names[Math.floor(Math.random() * names.length)],
    color: colors[Math.floor(Math.random() * colors.length)],
  };

  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
}
