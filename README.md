AI Agents chapter
# shadcn/ui monorepo template

This is a Next.js monorepo template with shadcn/ui.

## Adding components

To add components to your app, run the following command at the root of your `web` app:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will place the ui components in the `packages/ui/src/components` directory.

## Using components

To use the components in your app, import them from the `ui` package.

```tsx
import { Button } from "@workspace/ui/components/button";
```

## Running Convex Agent Playground

The Convex Agent Playground allows you to interact with and test your AI agents locally.

To run the playground:

1. Open a new terminal and navigate to the backend package:
   ```bash
   cd packages/backend
   ```
2. Start the playground server:
   ```bash
   npx agent-playground
   ```
3. Open your browser and go to `http://localhost:4173/`.

### Generating an API Key

If the playground asks for an API key, you can generate one using the following command inside the `packages/backend` directory:
```bash
npx convex run --component agent apiKeys:issue '{name:"my-test-key"}'
```
Copy the returned API key (e.g. `'j57ca1ab...'`) and paste it into the playground's authentication field.
