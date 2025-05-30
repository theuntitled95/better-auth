import {auth} from "@/lib/auth";
import {headers} from "next/headers";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div className="prose">
      <pre>
        <code>{JSON.stringify({session}, null, 2)}</code>
      </pre>
    </div>
  );
}
