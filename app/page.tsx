import LoginForm from "@/components/login-form";
import { Warehouse } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="space-y-6 text-center">
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center justify-center">
            <div className="relative">
              <Warehouse className="h-12 w-12 text-[#B7EFDB] absolute" />
              <Warehouse className="h-12 w-12 text-black transform translate-x-0.5 translate-y-0.5" />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-black italic uppercase text-black leading-none">Dulang</h1>
            <span className="text-sm font-medium text-blue-600 -mt-1">smart warehouse</span>
          </div>
        </div>
        <p className="text-lg text-muted-foreground">Product Verification System</p>
        <LoginForm />
      </div>
    </div>
  );
}