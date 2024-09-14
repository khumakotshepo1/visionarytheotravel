import { sql } from "@/database";
import { getVerificationTokenByEmail } from "@/server/users.server";
import { v4 as uuidv4 } from "uuid";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date().getTime() + 5 * 60; // 5 minutes

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await sql.query(`DELETE FROM verification_token WHERE token = $1`, [
      existingToken?.token,
    ]);
  }

  const verification_token = await sql.query(
    `INSERT INTO verification_token (email, token, expires) VALUES ($1, $2, $3) RETURNING *`,
    [email, token, new Date(expires)]
  );

  return verification_token.rows[0];
};
