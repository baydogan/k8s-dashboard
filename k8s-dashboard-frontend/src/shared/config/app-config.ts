/**
 * Application-level feature flags.
 *
 * USE_MOCK_DATA
 *   true  → all data comes from the local mock fixtures (no backend needed)
 *   false → all data is fetched from the real backend API
 *
 * Override via environment variable in .env.local:
 *   NEXT_PUBLIC_USE_MOCK_DATA=false
 */
export const USE_MOCK_DATA =
  process.env.NEXT_PUBLIC_USE_MOCK_DATA !== "false";
