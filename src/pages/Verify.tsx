import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, Search, CheckCircle2, XCircle, Upload } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function Verify() {
  const [certificateId, setCertificateId] = useState("");
  const [marks, setMarks] = useState("");
  const [verificationResult, setVerificationResult] = useState<any>(null);

  const handleVerify = () => {
    // Simulate verification
    setVerificationResult({
      status: "authentic",
      learnerName: "Rahul Kumar",
      qualification: "Bachelor of Technology in Computer Science",
      narrative: "Completed with distinction in all core subjects",
      issuedBy: "ISM Dhanbad",
      issueDate: "2024-03-15",
      certificateId: certificateId || "CERT-2024-001234",
      grade: marks || "A+",
    });
  };

  const handleQRScan = () => {
    // Simulate QR scan
    setCertificateId("CERT-2024-001234");
    handleVerify();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-12 blockchain-grid">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12 space-y-4">
            <h1 className="font-heading text-4xl md:text-5xl font-bold">
              Verify <span className="text-accent">Certificate</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Instantly verify the authenticity of any certificate
            </p>
          </div>

          <Card className="shadow-card bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="font-heading text-2xl">Certificate Verification</CardTitle>
              <CardDescription>
                Choose your preferred verification method
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="manual" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="scan" className="gap-2">
                    <QrCode className="h-4 w-4" />
                    Scan QR Code
                  </TabsTrigger>
                  <TabsTrigger value="manual" className="gap-2">
                    <Search className="h-4 w-4" />
                    Manual Verify
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="scan" className="space-y-6">
                  <div className="flex flex-col items-center gap-6 py-12">
                    <div className="w-64 h-64 border-4 border-dashed border-accent/50 rounded-2xl flex items-center justify-center bg-accent/5 hover:bg-accent/10 transition-colors cursor-pointer group">
                      <QrCode className="h-32 w-32 text-accent/50 group-hover:text-accent transition-colors" />
                    </div>
                    <Button variant="neon" size="lg" onClick={handleQRScan}>
                      Start QR Scan
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="manual" className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="certId">Certificate ID</Label>
                      <Input
                        id="certId"
                        placeholder="Enter certificate ID (e.g., CERT-2024-001234)"
                        value={certificateId}
                        onChange={(e) => setCertificateId(e.target.value)}
                        className="bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="marks">Marks/Grade</Label>
                      <Input
                        id="marks"
                        placeholder="Enter marks or grade"
                        value={marks}
                        onChange={(e) => setMarks(e.target.value)}
                        className="bg-background/50"
                      />
                    </div>
                    <Button 
                      variant="hero" 
                      size="lg" 
                      className="w-full"
                      onClick={handleVerify}
                    >
                      Verify Certificate
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Verification Result */}
              {verificationResult && (
                <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4">
                  <div className="border-t border-border/50 pt-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-heading text-xl font-semibold">Verification Result</h3>
                      <Badge 
                        variant={verificationResult.status === "authentic" ? "default" : "destructive"}
                        className={verificationResult.status === "authentic" ? "bg-accent text-accent-foreground" : ""}
                      >
                        {verificationResult.status === "authentic" ? (
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                        ) : (
                          <XCircle className="h-4 w-4 mr-2" />
                        )}
                        {verificationResult.status === "authentic" ? "Authentic" : "Revoked"}
                      </Badge>
                    </div>

                    <Card className="bg-background/50 border-accent/20">
                      <CardContent className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-muted-foreground">Learner Name</Label>
                            <p className="font-semibold">{verificationResult.learnerName}</p>
                          </div>
                          <div>
                            <Label className="text-muted-foreground">Certificate ID</Label>
                            <p className="font-semibold font-mono text-sm">{verificationResult.certificateId}</p>
                          </div>
                          <div className="md:col-span-2">
                            <Label className="text-muted-foreground">Qualification</Label>
                            <p className="font-semibold">{verificationResult.qualification}</p>
                          </div>
                          <div className="md:col-span-2">
                            <Label className="text-muted-foreground">Narrative</Label>
                            <p className="text-sm">{verificationResult.narrative}</p>
                          </div>
                          <div>
                            <Label className="text-muted-foreground">Issued By</Label>
                            <p className="font-semibold">{verificationResult.issuedBy}</p>
                          </div>
                          <div>
                            <Label className="text-muted-foreground">Issue Date</Label>
                            <p className="font-semibold">{verificationResult.issueDate}</p>
                          </div>
                          <div>
                            <Label className="text-muted-foreground">Grade</Label>
                            <p className="font-semibold text-accent">{verificationResult.grade}</p>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-border/50">
                          <Button variant="outline" className="w-full gap-2 border-accent/30 hover:border-accent">
                            <Upload className="h-4 w-4" />
                            Verify Marksheet Hash
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
