const API = import.meta.env.VITE_API_URL;
export async function signup(payload) {

  const res = await fetch(`${API}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),

  });
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function login(payload) {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),

  });
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function getMe() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Unauthorized");
  }


  return res.json();
}
