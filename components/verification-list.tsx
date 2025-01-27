"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, History, CheckCircle2, AlertCircle } from "lucide-react";

interface Verification {
  id: string;
  productId: string;
  productName: string;
  verifier: {
    name: string;
    role: string;
  };
  date: string;
  condition: string;
  stock: number;
  verified: boolean;
  notes: string;
  photos: string[];
  location: string;
  department: string;
}

const mockVerifications: Verification[] = [
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
    photos: [
      "https://images.unsplash.com/photo-1631567091196-d30fa3987905?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1631567091196-d30fa3987905?auto=format&fit=crop&q=80&w=400"
    ],
    location: "Gudang A",
    department: "Kontrol Kualitas"
  },
  {
    id: "v2",
    productId: "p2",
    productName: "Modena Built-in Oven",
    verifier: {
      name: "Jane Smith",
      role: "Inspektor Kualitas"
    },
    date: "2024-03-19T14:15:00Z",
    condition: "baru",
    stock: 8,
    verified: true,
    notes: "Semua unit dalam kemasan asli, segel utuh",
    photos: [
      "https://images.unsplash.com/photo-1585237017125-24baf8d7406f?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1585237017125-24baf8d7406f?auto=format&fit=crop&q=80&w=400"
    ],
    location: "Gudang B",
    department: "Kontrol Kualitas"
  }
];

interface VerificationCardProps {
  verification: Verification;
  onViewHistory: (productId: string) => void;
}

function VerificationCard({ verification, onViewHistory }: VerificationCardProps) {
  const formattedDate = new Date(verification.date).toLocaleString('id-ID');
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold">
              {verification.productName}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {verification.location}
            </p>
          </div>
          <Badge 
            variant={verification.verified ? "default" : "secondary"}
            className={verification.verified ? "text-black" : ""}
          >
            {verification.verified ? "Terverifikasi" : "Menunggu"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Verifikator</p>
            <p className="text-sm text-muted-foreground">
              {verification.verifier.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {verification.verifier.role}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Tanggal & Waktu</p>
            <p className="text-sm text-muted-foreground">
              {formattedDate}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {verification.verified ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-yellow-500" />
              )}
              <span className="text-sm font-medium">
                Stok: {verification.stock} unit
              </span>
            </div>
            <span className="text-sm text-muted-foreground capitalize">
              Kondisi: {verification.condition}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Catatan</p>
          <p className="text-sm text-muted-foreground">
            {verification.notes}
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Foto</p>
          <div className="grid grid-cols-2 gap-2">
            {verification.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Foto verifikasi ${index + 1}`}
                className="w-full aspect-square object-cover rounded-lg"
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center space-x-2">
            <Camera className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {verification.photos.length} foto
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-black"
            onClick={() => onViewHistory(verification.productId)}
          >
            <History className="mr-2 h-4 w-4" />
            Lihat Riwayat
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

interface VerificationListProps {
  verifications: Verification[];
  onViewHistory: (productId: string) => void;
}

export default function VerificationList({ verifications, onViewHistory }: VerificationListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {verifications.map((verification) => (
        <VerificationCard
          key={verification.id}
          verification={verification}
          onViewHistory={onViewHistory}
        />
      ))}
    </div>
  );
}