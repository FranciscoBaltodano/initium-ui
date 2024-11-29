import { AuthForm } from "@/components/auth/auth-form";
import Navbar from "@/components/ui/navbar";

export default function page () {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <AuthForm isLogin={false} />
        </div>
      </>
    )
  }
  

