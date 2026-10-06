# Project preview workflow

- Use `http://localhost:4321/` as the canonical preview for this project. The user reviews changes there.
- After website changes, verify the rendered page and applied styles in a browser at that address before reporting completion. A successful build or an HTML response alone does not verify the preview.
- If the preview shows stale content or styles, inspect listeners on port 4321, including both IPv4 (`127.0.0.1`) and IPv6 (`::1`). Previously, separate Astro processes on those addresses caused inconsistent previews.
- Restart this project's stale Astro server as needed. Stop confirmed duplicate project dev servers and keep a single server on port 4321; verify that `localhost:4321` resolves to it. Do not stop unrelated processes.
- Do not substitute verification on another port for checking the user's preview. If another port is needed for a production-build check, still verify the updated development preview on `localhost:4321` before finishing.
- When resolving stale styles, check the browser's computed styles and visual appearance, rather than relying solely on source files or recommending that the user refresh.
