"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addSubmission, getSubmissionBySlug, voteOnSubmission } from "@/lib/store";
import { evaluateSubmission } from "@/lib/ai-evaluator";

export async function submitApp(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const url = (formData.get("url") as string)?.trim();

  if (!name || !url) {
    return { error: "Nome e URL são obrigatórios." };
  }

  const slug = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const existing = getSubmissionBySlug(slug);
  if (existing) {
    return { error: "Esse app já foi cadastrado." };
  }

  const submission = await evaluateSubmission(name, url);
  addSubmission(submission);

  revalidatePath("/");
  revalidatePath(`/apps/${slug}`);
  redirect(`/apps/${slug}`);
}

export async function voteApp(slug: string, direction: "up" | "down") {
  const newVotes = voteOnSubmission(slug, direction);
  revalidatePath("/");
  revalidatePath(`/apps/${slug}`);
  return { votes: newVotes };
}
