export async function testProvide() {
  const res = await fetch("http://127.0.0.1:8000/api/v1/auth/provider", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = res.json();
  return Response.json({ data });
}
