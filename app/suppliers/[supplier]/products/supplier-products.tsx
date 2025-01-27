"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Warehouse, Package, Users, UserCircle } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard, { Product } from "@/components/product-card";

const products: Product[] = [
  {
    id: 1,
    name: "Daikin Split AC 1.5PK",
    supplier: "daikin",
    category: "Air Conditioner",
    status: "Pending",
    image: "https://images.unsplash.com/photo-1631567091196-d30fa3987905?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 2,
    name: "Modena Built-in Oven",
    supplier: "modena",
    category: "Kitchen Appliance",
    status: "Verified",
    image: "https://images.unsplash.com/photo-1585237017125-24baf8d7406f?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 3,
    name: "Samsung Smart TV",
    supplier: "blibli",
    category: "Television",
    status: "Verified",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 4,
    name: "LG Refrigerator",
    supplier: "blibli",
    category: "Kitchen Appliance",
    status: "Pending",
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 5,
    name: "Modena Gas Stove",
    supplier: "modena",
    category: "Kitchen Appliance",
    status: "Pending",
    image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 6,
    name: "iPhone 14 Pro",
    supplier: "grab",
    category: "Smartphone",
    status: "Verified",
    image: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?auto=format&fit=crop&q=80&w=400",
  }
];

export default function SupplierProducts() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const params = useParams();
  const supplier = params.supplier as string;

  const supplierProducts = products.filter(product => 
    product.supplier.toLowerCase() === supplier.toLowerCase()
  );

  const verifiedProducts = supplierProducts.filter(product => product.status === "Verified");
  const unverifiedProducts = supplierProducts.filter(product => product.status === "Pending");
  const verificationProgress = (verifiedProducts.length / supplierProducts.length) * 100;

  const filteredProducts = supplierProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0 mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Products</h2>
            <div className="relative w-full sm:w-auto">
              <div className="absolute left-2 top-2.5">
                <Search className="h-4 w-4 text-[#B7EFDB] absolute" />
                <Search className="h-4 w-4 text-black transform translate-x-0.5 translate-y-0.5" />
              </div>
              <Input
                placeholder="Search products..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Verification Progress</span>
              <span className="text-sm font-medium text-gray-700">
                {verifiedProducts.length} of {supplierProducts.length} verified
              </span>
            </div>
            <Progress value={verificationProgress} className="h-2" />
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 h-auto">
              <TabsTrigger value="all" className="px-2 py-2 text-sm">
                All
                <span className="ml-1 text-xs text-gray-500">
                  ({filteredProducts.length})
                </span>
              </TabsTrigger>
              <TabsTrigger value="verified" className="px-2 py-2 text-sm">
                Verified
                <span className="ml-1 text-xs text-gray-500">
                  ({verifiedProducts.length})
                </span>
              </TabsTrigger>
              <TabsTrigger value="unverified" className="px-2 py-2 text-sm">
                Pending
                <span className="ml-1 text-xs text-gray-500">
                  ({unverifiedProducts.length})
                </span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="verified">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
                {filteredProducts
                  .filter(product => product.status === "Verified")
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="unverified">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
                {filteredProducts
                  .filter(product => product.status === "Pending")
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-md mx-auto px-6 h-16">
          <div className="grid grid-cols-3 h-full">
            <button
              onClick={() => router.push("/products")}
              className="flex flex-col items-center justify-center space-y-1 text-gray-600"
            >
              <Package className="h-6 w-6" />
              <span className="text-xs">Products</span>
            </button>
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