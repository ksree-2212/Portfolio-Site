const BACKEND_API_URL = process.env.BACKEND_API_URL || "http://localhost:5000";

export async function PUT(request, { params }) {
  const { id } = params;
  const token = request.headers.get("authorization");
  const body = await request.json();

  try {
    const response = await fetch(`${BACKEND_API_URL}/api/projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token && { "Authorization": token }),
      },
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

export async function DELETE(request, { params }) {
  const { id } = params;
  const token = request.headers.get("authorization");

  try {
    const response = await fetch(`${BACKEND_API_URL}/api/projects/${id}`, {
      method: "DELETE",
      headers: {
        ...(token && { "Authorization": token }),
      },
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
