const URL = "http://localhost:3000";

export const getCart = async () => {
  return fetch(`${URL}/cart`).then((res) => res.json());
};

export const getInventory = async () => {
  return fetch(`${URL}/inventory`).then((res) => res.json());
};

export const addToCart = async (inventoryItem) => {
  return fetch(`${URL}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inventoryItem),
  }).then((res) => res.json());
};

export const updateCart = async (id, newAmount) => {
  return fetch(`${URL}/cart/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newAmount),
  }).then((res) => res.json());
};

export const deleteFromCart = async (id) => {
  return fetch(`${URL}/cart/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

export const checkout = async () => {
  return getCart().then((data) =>
    Promise.all(data.map((item) => deleteFromCart(item.id)))
  );
};
