export async function startCheckout(plan) {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plan }),
  });
  if (!res.ok) throw new Error("checkout failed");
  const { url } = await res.json();
  window.location.href = url;
}
