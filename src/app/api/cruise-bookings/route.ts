
import { auth } from "@/auth";
import { sql } from "@/database";

export async function GET() {
	try {
		const session = await auth();

		if (!session) {
			return new Response(JSON.stringify({ error: "Unauthorized" }), {
				status: 401,
				headers: { "Content-Type": "application/json" },
			});
		}

		if (session?.user?.role !== "ADMIN" && session?.user?.role !== "MANAGER") {
			return new Response(JSON.stringify({ error: "Unauthorized" }), {
				status: 403,
				headers: { "Content-Type": "application/json" },
			});
		}

		const { rows } = await sql.query(
			`SELECT cb.*, c.*, cu.*
       FROM cruise_bookings cb
       JOIN cruises c ON c.cruise_id = cb.cruise_id
       JOIN customers cu ON cu.customer_id = cb.customer_id`
		);

		return new Response(JSON.stringify(rows), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.error("Error fetching cruise bookings:", error); // Log the error
		return new Response(JSON.stringify({ error: "Failed to fetch cruise bookings." }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
