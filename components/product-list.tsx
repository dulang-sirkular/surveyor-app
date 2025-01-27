"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data - Replace with actual API call
const mockProducts = [
  {
    id: 1,
    name: "Industrial Steel Pipes",
    supplier: "Steel Corp Inc.",
    category: "Construction",
    status: "Pending",
    image: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 2,
    name: "Electrical Cables",
    supplier: "ElectraTech",
    category: "Electrical",
    status: "Verified",
    image: "https://images.unsplash.com/photo-1601752943749-7dd8d89f407a?auto=format&fit=crop&q=80&w=400",
  },
  // Add more mock products as needed
];

interface ProductListProps {
  searchQuery: string;
}

export default function ProductList({ searchQuery }: ProductListProps) {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.supplier.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <Card key={product.id} className="overflow-hidden">
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
              <div className="flex justify-between items-center mt-4">
                <Badge variant={product.status === "Verified" ? "default" : "secondary"}>
                  {product.status}
                </Badge>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="text-black"
                      onClick={() => setSelectedProduct(product)}
                    >
                      Verify Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Product Verification</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label>Verification Status</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="verified">Verified</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                            <SelectItem value="pending">Pending Review</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Notes</Label>
                        <Textarea placeholder="Add verification notes..." />
                      </div>
                      <Button className="w-full text-black">
                        Submit Verification
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}