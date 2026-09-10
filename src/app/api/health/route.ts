/**
 * Hosting healthcheck endpoint required by the preview runtime.
 * Intentionally minimal and static: this project is frontend-only (no database, no business API).
 */
export const dynamic = "force-static";

export function GET() {
  return Response.json({ ok: true, app: "black-milk-school", mode: "frontend-only" });
}
