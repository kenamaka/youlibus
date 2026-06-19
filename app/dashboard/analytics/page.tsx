'use client'

import DashboardHeader from "@/src/auth/Navbar";
import CategoriesPage from "@/src/auth/Navigation/Categories";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import AnalyticsPage from "@/src/auth/Navigation/AnalyticsPage";
export default function Page() {
    const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

    useEffect(() => {
        let mounted = true;
    
        async function checkAuth() {
          const {
            data: { session },
          } = await supabase.auth.getSession();
    
          if (!mounted) return;
    
          if (!session) {
            router.replace("/login");
            return;
          }
    
          setUser(session.user);
          setLoading(false);
        }
    
        checkAuth();
    },[])

    async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }
  return (
    <>
       <DashboardHeader
              email={user?.email}
              onLogout={handleLogout}
            />
      <AnalyticsPage/>
    </>
  );
}