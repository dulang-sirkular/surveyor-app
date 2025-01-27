"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, FlipHorizontal, Warehouse, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyPage() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [productName, setProductName] = useState("");
  const [condition, setCondition] = useState("");
  const [stock, setStock] = useState("");
  const [notes, setNotes] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const product = searchParams.get("product");
    if (product) {
      setProductName(decodeURIComponent(product));
    } else {
      // Redirect back if no product name is provided
      router.push("/products");
    }
  }, [searchParams, router]);

  useEffect(() => {
    return () => {
      // Cleanup: stop all tracks when component unmounts
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const requestCameraPermission = async () => {
    try {
      const constraints = {
        video: { facingMode: isFrontCamera ? "user" : "environment" }
      };
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      setHasPermission(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setHasPermission(false);
    }
  };

  const switchCamera = async () => {
    if (stream) {
      // Stop current stream
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    
    setIsFrontCamera(!isFrontCamera);
    // Request new stream with different camera
    await requestCameraPermission();
  };

  const takePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const photoData = canvas.toDataURL("image/jpeg");
        setPhotos(prev => [...prev, photoData]);
      }
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    const verificationData = {
      productName,
      photos,
      condition,
      stock: parseInt(stock),
      notes
    };
    console.log("Submitting verification:", verificationData);
    // Add your API call here
    router.push("/products");
  };

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
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Camera className="h-6 w-6" />
              <span>Product Verification</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="productName">Product Name</Label>
                <Input 
                  id="productName" 
                  value={productName}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
              <div className="space-y-2">
                <Label>Product Condition</Label>
                <Select value={condition} onValueChange={setCondition}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="like-new">Like New</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input 
                  id="stock"
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="Enter stock quantity"
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Verification Notes</Label>
                <Textarea 
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any notes about the product condition, packaging, or other observations..."
                  className="min-h-[100px]"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label>Product Photos</Label>
              {photos.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img
                        src={photo}
                        alt={`Product photo ${index + 1}`}
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6"
                        onClick={() => removePhoto(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
                {!stream && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button 
                      onClick={requestCameraPermission}
                      className="text-black"
                    >
                      <Camera className="mr-2 h-4 w-4" />
                      {photos.length === 0 ? 'Take Photos' : 'Take More Photos'}
                    </Button>
                  </div>
                )}
                
                {stream && (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                      <Button
                        onClick={switchCamera}
                        variant="secondary"
                        className="bg-white/80 backdrop-blur-sm"
                      >
                        <FlipHorizontal className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={takePhoto}
                        className="bg-white/80 backdrop-blur-sm text-black"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => {
                          if (stream) {
                            stream.getTracks().forEach(track => track.stop());
                            setStream(null);
                          }
                        }}
                        variant="secondary"
                        className="bg-white/80 backdrop-blur-sm"
                      >
                        Done
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>

            <Button 
              className="w-full text-black"
              onClick={handleSubmit}
              disabled={!condition || !stock || !notes || photos.length === 0}
            >
              Submit Verification
            </Button>

            {hasPermission === false && (
              <div className="text-center p-4 text-red-500">
                Camera access denied. Please enable camera access in your browser settings.
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}