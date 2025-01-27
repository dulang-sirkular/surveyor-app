"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Warehouse, Users, UserCircle, Package } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

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
                <span className="text-xs font-medium text-blue-600 block">smart warehouse</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex flex-col space-y-4 mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Suppliers</h2>
            <div className="relative w-full">
              <div className="absolute left-2 top-2.5">
                <Search className="h-4 w-4 text-[#B7EFDB] absolute" />
                <Search className="h-4 w-4 text-black transform translate-x-0.5 translate-y-0.5" />
              </div>
              <Input
                placeholder="Search suppliers..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <SupplierList searchQuery={searchQuery} router={router} />
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-md mx-auto px-6 h-16">
          <div className="grid grid-cols-2 h-full">
            <button
              className="flex flex-col items-center justify-center space-y-1 text-blue-600"
            >
              <Users className="h-6 w-6" />
              <span className="text-xs">Suppliers</span>
            </button>
            <button
              onClick={() => router.push("/profile")}
              className="flex flex-col items-center justify-center space-y-1 text-gray-600"
            >
              <UserCircle className="h-6 w-6" />
              <span className="text-xs">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SupplierList({ searchQuery, router }: { searchQuery: string; router: any }) {
  const suppliers = [
    {
      id: 1,
      name: "Grab",
      type: "E-commerce",
      location: "Jakarta, Indonesia",
      products: 8,
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 2,
      name: "Blibli",
      type: "E-commerce",
      location: "Jakarta, Indonesia",
      products: 15,
      image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 3,
      name: "Modena",
      type: "Home Appliances",
      location: "Tangerang, Indonesia",
      products: 12,
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 4,
      name: "Daikin",
      type: "Air Conditioning",
      location: "Jakarta, Indonesia",
      products: 6,
      image: "https://images.unsplash.com/photo-1527016021513-b09758b777bc?auto=format&fit=crop&q=80&w=400",
    }
  ];

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredSuppliers.map((supplier) => (
        <Card key={supplier.id} className="overflow-hidden">
          <img
            src={supplier.image}
            alt={supplier.name}
            className="w-full h-48 object-cover"
          />
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-2">{supplier.name}</h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Type: {supplier.type}
              </p>
              <p className="text-sm text-muted-foreground">
                Location: {supplier.location}
              </p>
              <p className="text-sm text-muted-foreground">
                Active Products: {supplier.products}
              </p>
              <Button 
                className="w-full mt-4 text-black"
                variant="outline"
                onClick={() => router.push(`/suppliers/${supplier.name.toLowerCase()}/products`)}
              >
                <Package className="mr-2 h-4 w-4" />
                View Products
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}