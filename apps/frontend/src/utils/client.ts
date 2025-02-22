import { AppType } from "backend/src"; // Workspacesを使用しているため、"../../backend..."のように相対パスで書かなくて良い
import { hc } from 'hono/client'

export const client = hc<AppType>(process.env.NEXT_PUBLIC_API_URL!)
