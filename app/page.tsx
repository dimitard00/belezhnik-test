import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";
const prisma = new PrismaClient();

async function add(form: FormData) {
  "use server";
  const text = String(form.get("text") ?? "").trim();
  if (text) await prisma.note.create({ data: { text } });
  revalidatePath("/");
}

async function remove(form: FormData) {
  "use server";
  const id = Number(form.get("id"));
  if (Number.isInteger(id)) await prisma.note.deleteMany({ where: { id } });
  revalidatePath("/");
}

export default async function Home() {
  const notes = await prisma.note.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <main>
      <h1>Бележник</h1>
      <form action={add}><input name="text" placeholder="Нова бележка" /> <button>Добави</button></form>
      <ul>{notes.map((n) => <li key={n.id}>
        {n.text}{" "}
        <form action={remove} style={{ display: "inline" }}>
          <input type="hidden" name="id" value={n.id} />
          <button>Изтрий</button>
        </form>
      </li>)}</ul>
      <p style={{ color: "#888" }}>Имейли: {process.env.RESEND_API_KEY ? "включени" : "изключени"}</p>
    </main>
  );
}
