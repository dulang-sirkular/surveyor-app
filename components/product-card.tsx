"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, History, Archive } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface VerificationRecord {
  date: string;
  stock: number;
  verified: boolean;
}

type VerificationHistoryType = {
  [key: string]: VerificationRecord[];
};

const verificationHistory: VerificationHistoryType = {
  "Daikin Split AC 1.5PK": [
    { date: "2024-03-20", stock: 5, verified: true },
    { date: "2024-03-15", stock: 10, verified: true }
  ],
  "Modena Built-in Oven": [
    { date: "2024-03-18", stock: 8, verified: true },
    { date: "2024-03-10", stock: 15, verified: false }
  ],
  "Samsung Smart TV": [
    { date: "2024-03-19", stock: 12, verified: true }
  ],
  "LG Refrigerator": [
    { date: "2024-03-17", stock: 6, verified: true }
  ],
  "Modena Gas Stove": [
    { date: "2024-03-16", stock: 9, verified: true }
  ],
  "iPhone 14 Pro": [
    { date: "2024-03-14", stock: 20, verified: true }
  ]
};

export interface Product {
  id: number;
  name: string;
  supplier: string;
  category: string;
  status: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

function isVerifiableProduct(productName: string): productName is string {
  return productName in verificationHistory;
}

function calculateStockInfo(productName: string) {
  const history = verificationHistory[productName];
  const totalStock = history[0]?.stock ?? 0;
  const verifiedStock = history[0]?.verified ? history[0].stock : 0;
  return { totalStock, verifiedStock };
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  let totalStock = 0;
  let verifiedStock = 0;
  
  if (isVerifiableProduct(product.name)) {
    const stockInfo = calculateStockInfo(product.name);
    totalStock = stockInfo.totalStock;
    verifiedStock = stockInfo.verifiedStock;
  }
  
  const verifyRate = totalStock > 0 ? Math.round((verifiedStock / totalStock) * 100) : 0;
  const isFullyVerified = verifyRate === 100;
  
  return (
    <Card className="overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Supplier: {product.supplier}
          </p>
          <p className="text-sm text-muted-foreground">
            Category: {product.category}
          </p>
          <div className="flex items-center justify-between mt-2 mb-3">
            <div className="flex items-center space-x-2">
              <Archive className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                Stock: {verifiedStock}/{totalStock}
              </span>
            </div>
            <Badge 
              variant={isFullyVerified ? "default" : "secondary"}
              className={isFullyVerified ? "text-black" : ""}
            >
              {isFullyVerified ? "Verified" : `${verifyRate}% Verified`}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              className="w-full text-black"
              variant="outline"
              onClick={() => router.push(`/verify?product=${encodeURIComponent(product.name)}`)}
            >
              <Package className="mr-2 h-4 w-4" />
              Verify
            </Button>
            <Button 
              className="w-full text-black"
              variant="outline"
              onClick={() => router.push(`/products/${encodeURIComponent(product.name)}/history`)}
            >
              <History className="mr-2 h-4 w-4" />
              History
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
