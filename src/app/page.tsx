"use client";
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {

  const router = useRouter();
  useEffect(() => {
  // router.push('/login') ;
  router.push('/upload');
}, [router]);
  return null; // Or you can return a loading spinner or message
};


