import { redirect } from "next/navigation";

export default function SubjectRedirectPage({ params }: { params: { slug: string } }) {
  redirect(`/study/thema-${params.slug}`);
}
