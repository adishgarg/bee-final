"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AuthControl() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="userInfo">
      {isLoggedIn ? (
        <Link className="navInfo" href="/account">
          <img src="/assets/icons/person-fill.svg" alt="Account" />
        </Link>
      ) : (
        <Link className="navInfo" href="/login">
          LOG IN
        </Link>
      )}
    </div>
  );
}