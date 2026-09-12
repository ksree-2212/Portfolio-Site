const BACKEND_API_URL = process.env.BACKEND_API_URL || "http://localhost:5000";

export async function POST(request) {
  const body = await request.json();

  try {
    const response = await fetch(`${BACKEND_API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return Response.json(data, { status: response.status });
  } catch (error) {
    return Response.json(
      { error: "Failed to connect to server" },
      { status: 500 }
    );
  }
}
