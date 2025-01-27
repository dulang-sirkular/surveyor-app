"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Warehouse, Archive } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import VerificationList from "@/components/verification-list";

// Mock verification data - Replace with actual data from your backend
interface Verifier {
  name: string;
  role: string;
}

interface Verification {
  id: string;
  productId: string;
  productName: string;
  verifier: Verifier;
  date: string;
  condition: string;
  stock: number;
  verified: boolean;
  notes: string;
  photos: string[];
  location: string;
  department: string;
}

type MockVerifications = {
  [key: string]: Verification[];
};

const mockVerifications: MockVerifications = {
  "Daikin Split AC 1.5PK": [
    {
      id: "v1",
      productId: "p1",
      productName: "Daikin Split AC 1.5PK",
      verifier: {
        name: "John Doe",
        role: "Surveyor Senior"
      },
      date: "2024-03-20T10:30:00Z",
      condition: "baik",
      stock: 5,
      verified: true,
      notes: "Goresan kecil pada casing luar, semua unit berfungsi dengan baik",
      photos: ["https://images.unsplash.com/photo-1631567091196-d30fa3987905?auto=format&fit=crop&q=80&w=400"],
      location: "Gudang A",
      department: "Kontrol Kualitas"
    },
    {
      id: "v2",
      productId: "p1",
      productName: "Daikin Split AC 1.5PK",
      verifier: {
        name: "Jane Smith",
        role: "Inspektor Kualitas"
      },
      date: "2024-03-15T14:15:00Z",
      condition: "baru",
      stock: 10,
      verified: true,
      notes: "Kondisi sempurna, kemasan asli",
      photos: ["https://images.unsplash.com/photo-1631567091196-d30fa3987905?auto=format&fit=crop&q=80&w=400"],
      location: "Gudang B",
      department: "Kontrol Kualitas"
    }
  ],
  "Modena Built-in Oven": [
    {
      id: "v3",
      productId: "p2",
      productName: "Modena Built-in Oven",
      verifier: {
        name: "Mike Johnson",
        role: "Inspektor Senior"
      },
      date: "2024-03-18T09:00:00Z",
      condition: "baik",
      stock: 8,
      verified: true,
      notes: "Semua unit telah diuji dan berfungsi dengan baik",
      photos: ["https://images.unsplash.com/photo-1585237017125-24baf8d7406f?auto=format&fit=crop&q=80&w=400"],
      location: "Gudang A",
      department: "Kontrol Kualitas"
    }
  ]
};

const calculateTotalStock = (verifications: Verification[]) => {
  const totalStock = verifications.reduce((sum, v) => sum + v.stock, 0);
  const verifiedStock = verifications
    .filter(v => v.verified)
    .reduce((sum, v) => sum + v.stock, 0);
  return { totalStock, verifiedStock };
};

export default function ProductHistoryPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  const productName = decodeURIComponent(productId);
  const verifications = mockVerifications[productName] || [];
  const { totalStock, verifiedStock } = calculateTotalStock(verifications);
  const verificationRate = totalStock > 0 ? Math.round((verifiedStock / totalStock) * 100) : 0;

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
                <span className="text-xs font-medium text-blue-600 block">gudang pintar</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex flex-col space-y-4 mb-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-gray-900">Riwayat Verifikasi</h2>
              <p className="text-sm text-gray-500">{productName}</p>
            </div>
            <Button
              className="text-black w-full sm:w-auto"
              onClick={() => router.push(`/verify?product=${encodeURIComponent(productName)}`)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Verifikasi Baru
            </Button>
          </div>

          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Archive className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Total Stok</p>
                    <p className="text-2xl font-bold">{verifiedStock}/{totalStock}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Tingkat Verifikasi</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-lg font-semibold">{verificationRate}%</p>
                    <Badge 
                      variant={verificationRate === 100 ? "default" : "secondary"}
                      className={verificationRate === 100 ? "text-black" : ""}
                    >
                      {verificationRate === 100 ? "Terverifikasi" : "Dalam Proses"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <VerificationList 
              verifications={verifications}
              onViewHistory={(productId) => {
                console.log("View history for:", productId);
              }} 
            />

            {verifications.length === 0 && (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                  Tidak ada riwayat verifikasi untuk produk ini.
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}