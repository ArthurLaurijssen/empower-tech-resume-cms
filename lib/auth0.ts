/**
 * Auth0 Client Configuration
 *
 * Currently, auth 4 in beta
 * Configures the Auth0 client for Next.js authentication with specific
 * authorization parameters and session handling. This configuration enables
 * OpenID Connect authentication flow with refresh token support.
 *
 * @module auth0-config
 */

import { Auth0Client } from "@auth0/nextjs-auth0/server";

/**
 * Auth0 Client Instance
 *
 * Configured Auth0 client with:
 * - API audience targeting
 * - OpenID Connect scopes
 * - Refresh token persistence
 *
 * Authorization Parameters:
 * @property {string} audience - Target API identifier (empowertech API)
 * @property {string} scope - Space-separated list of requested permissions:
 *   - openid: Required for OpenID Connect
 *   - profile: Access to user profile information
 *   - email: Access to user email
 *   - offline_access: Enables refresh token issuance
 *
 * Session Handling:
 * - Preserves refresh token in session for token renewal
 * - Maintains session state across requests
 *
 * @example
 * // Usage in API routes
 * import { auth0 } from '@/path/to/auth0-config';
 *
 * // Get session
 * const session = await auth0.getSession();
 *
 * // Handle callback
 * await auth0.handleCallback(req, res);
 */
export const auth0 = new Auth0Client({
  // Configure authorization parameters
  authorizationParameters: {
    audience: "https://api.empowertech.be", // Target API identifier
    scope: "openid profile email offline_access", // Requested permissions
  },

  // Session modification hook
  async beforeSessionSaved(session) {
    // Persist refresh token in session
    return {
      ...session,
      refresh_token: session.refresh_token,
    };
  },
});
