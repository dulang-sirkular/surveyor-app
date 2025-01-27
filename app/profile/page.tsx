"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogOut, UserCircle, Users, Warehouse } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import { LanguageToggle } from "@/components/language-toggle";

export default function Profile() {
  const router = useRouter();
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-white pb-16">
      <nav className="bg-[#B7EFDB] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Warehouse className="h-6 w-6 text-[#B7EFDB] absolute" />
                <Warehouse className="h-6 w-6 text-black transform translate-x-0.5 translate-y-0.5" />
              </div>
              <div className="-space-y-1">
                <h1 className="text-2xl font-black italic uppercase text-black leading-none">Dulang</h1>
                <span className="text-xs font-medium text-blue-600 block">{t('smart.warehouse')}</span>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <UserCircle className="h-12 w-12 text-[#B7EFDB] absolute" />
                <UserCircle className="h-12 w-12 text-black transform translate-x-0.5 translate-y-0.5" />
              </div>
              <div className="space-y-1">
                <CardTitle>{t('profile.information')}</CardTitle>
                <p className="text-sm text-muted-foreground">{t('profile.personal')}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t('profile.fullName')}</Label>
                <div className="relative">
                  <Input 
                    id="name" 
                    defaultValue="John Doe" 
                    readOnly 
                    className="bg-gray-50 text-gray-600 cursor-not-allowed focus-visible:ring-0 focus-visible:ring-offset-0" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Input 
                    id="email" 
                    type="email" 
                    defaultValue="john.doe@example.com" 
                    readOnly 
                    className="bg-gray-50 text-gray-600 cursor-not-allowed focus-visible:ring-0 focus-visible:ring-offset-0" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">{t('profile.role')}</Label>
                <div className="relative">
                  <Input 
                    id="role" 
                    defaultValue="Surveyor Senior" 
                    readOnly 
                    className="bg-gray-50 text-gray-600 cursor-not-allowed focus-visible:ring-0 focus-visible:ring-offset-0" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">{t('profile.department')}</Label>
                <div className="relative">
                  <Input 
                    id="department" 
                    defaultValue="Kontrol Kualitas" 
                    readOnly 
                    className="bg-gray-50 text-gray-600 cursor-not-allowed focus-visible:ring-0 focus-visible:ring-offset-0" 
                  />
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <Button 
                className="w-full text-black hover:bg-red-100 border-red-200"
                variant="outline"
                onClick={() => router.push("/")}
              >
                <LogOut className="mr-2 h-4 w-4" />
                {t('profile.logout')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-md mx-auto px-6 h-16">
          <div className="grid grid-cols-2 h-full">
            <button
              onClick={() => router.push("/dashboard")}
              className="flex flex-col items-center justify-center space-y-1 text-gray-600"
            >
              <Users className="h-6 w-6" />
              <span className="text-xs">{t('nav.suppliers')}</span>
            </button>
            <button
              className="flex flex-col items-center justify-center space-y-1 text-blue-600"
            >
              <UserCircle className="h-6 w-6" />
              <span className="text-xs">{t('nav.profile')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}