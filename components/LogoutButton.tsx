"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  function logout() {
    document.cookie = "flashcards_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/login");
    router.refresh();
  }

  return (
    <button className="ghostButton" onClick={logout}>
      Logout
    </button>
  );
}
