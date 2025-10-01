import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, QrCode, ExternalLink } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

export default function Issue() {
  const { toast } = useToast();
  const [isAuthorized, setIsAuthorized] = useState(true); // Simulate wallet authorization
  const [isWalletConnected, setIsWalletConnected] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedCertId, setGeneratedCertId] = useState("");
  
  const [formData, setFormData] = useState({
    learnerName: "",
    learnerId: "",
    certificateType: "",
    courseName: "",
    courseNarrative: "",
    grade: "",
    completionDate: "",
    customCertId: "",
    validUntil: "lifetime",
    validUntilDate: "",
  });

  const templates = [
    { 
      id: "1", 
      name: "Bachelor of Technology", 
      category: "Degree",
      defaultNarrative: "This certifies successful completion of a 4-year undergraduate program in Technology with comprehensive theoretical and practical training."
    },
    { 
      id: "2", 
      name: "Advanced Diploma", 
      category: "Diploma",
      defaultNarrative: "This certifies successful completion of an advanced diploma program demonstrating specialized knowledge and practical skills."
    },
    { 
      id: "3", 
      name: "Professional Certificate", 
      category: "Certificate",
      defaultNarrative: "This certifies successful completion of professional training and assessment in the specified skill area."
    },
  ];

  const handleTemplateChange = (value: string) => {
    const template = templates.find(t => t.id === value);
    setFormData({
      ...formData,
      certificateType: value,
      courseName: template?.name || "",
      courseNarrative: template?.defaultNarrative || "",
    });
  };

  // No file upload for grade/result; manual entry only

  const handlePreview = () => {
    window.open("/certificate-preview", "_blank");
    toast({
      title: "Preview Opened",
      description: "Certificate preview opened in new tab",
    });
  };

  const handleGenerateCertificate = () => {
    // Simulate blockchain transaction
    const certId = `CERT-2025-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
    setGeneratedCertId(certId);
    setIsSubmitted(true);
    
    toast({
      title: "Certificate Issued Successfully! 🎉",
      description: `Certificate ID: ${certId}`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-12 blockchain-grid">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-8 space-y-4">
            <h1 className="font-heading text-4xl md:text-5xl font-bold">
              Issue <span className="text-accent">Certificate</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Create and issue blockchain-verified credentials
            </p>
          </div>

          {/* Authorization Status */}
          <div className="flex gap-4 justify-center mb-8">
            <Badge variant={isWalletConnected ? "default" : "outline"} className="gap-2 px-4 py-2">
              {isWalletConnected ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
              {isWalletConnected ? "Wallet Connected" : "Wallet Not Connected"}
            </Badge>
            <Badge variant={isAuthorized ? "default" : "destructive"} className="gap-2 px-4 py-2">
              {isAuthorized ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
              {isAuthorized ? "Authorized Institution" : "Unauthorized"}
            </Badge>
          </div>

          {/* Unauthorized Warning */}
          {!isAuthorized && (
            <Card className="mb-8 border-destructive bg-destructive/10">
              <CardContent className="p-6 text-center">
                <XCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
                <h3 className="font-heading text-xl font-bold mb-2">Unauthorized Access</h3>
                <p className="text-muted-foreground">
                  Your wallet is not registered as an authorized issuer. Please contact the administrator.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Success State */}
          {isSubmitted && (
            <Card className="mb-8 border-accent bg-accent/10">
              <CardContent className="p-8 text-center space-y-6">
                <CheckCircle className="h-16 w-16 text-accent mx-auto" />
                <div>
                  <h3 className="font-heading text-2xl font-bold mb-2">Certificate Issued Successfully!</h3>
                  <p className="text-muted-foreground">The credential has been recorded on the blockchain</p>
                </div>
                <div className="bg-card rounded-lg p-6 space-y-4">
                  <div>
                    <Label className="text-muted-foreground">Certificate ID</Label>
                    <p className="font-mono text-lg font-bold text-accent">{generatedCertId}</p>
                  </div>
                  <div className="bg-background p-6 rounded-lg inline-block">
                    <QrCode className="h-32 w-32 text-accent" />
                  </div>
                  <p className="text-sm text-muted-foreground">Scan this QR code to verify the certificate</p>
                </div>
                <Button onClick={() => setIsSubmitted(false)} variant="outline">
                  Issue Another Certificate
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Issue Form */}
          {!isSubmitted && (
            <Card className="shadow-card bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="font-heading text-2xl">Certificate Issuance Form</CardTitle>
                <CardDescription>Fill in all required details to issue a new credential</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Learner Details Section */}
                <div className="space-y-4">
                  <h3 className="font-heading text-lg font-semibold border-b border-accent/20 pb-2">
                    Learner Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="learnerName">
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="learnerName"
                        placeholder="Enter learner's full name"
                        value={formData.learnerName}
                        onChange={(e) => setFormData({ ...formData, learnerName: e.target.value })}
                        className="bg-background/50"
                        disabled={!isAuthorized}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="learnerId">Learner ID (Optional)</Label>
                      <Input
                        id="learnerId"
                        placeholder="Aadhaar/Student ID (will be hashed)"
                        value={formData.learnerId}
                        onChange={(e) => setFormData({ ...formData, learnerId: e.target.value })}
                        className="bg-background/50"
                        disabled={!isAuthorized}
                      />
                      <p className="text-xs text-muted-foreground">ID will be hashed for privacy protection</p>
                    </div>
                  </div>
                </div>

                {/* Course Details Section */}
                <div className="space-y-4">
                  <h3 className="font-heading text-lg font-semibold border-b border-accent/20 pb-2">
                    Course Details
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="certificateType">
                        Certificate Type <span className="text-destructive">*</span>
                      </Label>
                      <Select 
                        value={formData.certificateType} 
                        onValueChange={handleTemplateChange}
                        disabled={!isAuthorized}
                      >
                        <SelectTrigger className="bg-background/50">
                          <SelectValue placeholder="Select a certificate type" />
                        </SelectTrigger>
                        <SelectContent>
                          {templates.map((template) => (
                            <SelectItem key={template.id} value={template.id}>
                              <div className="flex items-center gap-2">
                                {template.name}
                                <Badge variant="outline" className="ml-2">{template.category}</Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="courseName">
                        Course/Qualification Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="courseName"
                        placeholder="Official title of the skill"
                        value={formData.courseName}
                        onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                        className="bg-background/50"
                        disabled={!isAuthorized}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="courseNarrative">Course Narrative/Details</Label>
                      <Textarea
                        id="courseNarrative"
                        placeholder="Course-specific details, duration, modules..."
                        value={formData.courseNarrative}
                        onChange={(e) => setFormData({ ...formData, courseNarrative: e.target.value })}
                        className="bg-background/50 min-h-32"
                        disabled={!isAuthorized}
                      />
                      <p className="text-xs text-muted-foreground">Pre-filled from template, can be customized</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="grade">
                        Grade/Result/Score <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="grade"
                        placeholder="e.g., A+, 98% (will be hashed)"
                        value={formData.grade}
                        onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                        className="bg-background/50"
                        disabled={!isAuthorized}
                      />
                      <p className="text-xs text-muted-foreground">Enter the awarded grade or score. No file upload required.</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="completionDate">
                        Date of Completion <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="completionDate"
                        type="date"
                        value={formData.completionDate}
                        onChange={(e) => setFormData({ ...formData, completionDate: e.target.value })}
                        className="bg-background/50"
                        disabled={!isAuthorized}
                      />
                    </div>
                  </div>
                </div>

                {/* Certificate Metadata Section */}
                <div className="space-y-4">
                  <h3 className="font-heading text-lg font-semibold border-b border-accent/20 pb-2">
                    Certificate Metadata
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="customCertId">Custom Certificate ID (Optional)</Label>
                      <Input
                        id="customCertId"
                        placeholder="Internal reference ID"
                        value={formData.customCertId}
                        onChange={(e) => setFormData({ ...formData, customCertId: e.target.value })}
                        className="bg-background/50"
                        disabled={!isAuthorized}
                      />
                      <p className="text-xs text-muted-foreground">Leave blank for auto-generation</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="validUntil">Valid Until</Label>
                      <Select 
                        value={formData.validUntil} 
                        onValueChange={(v) => setFormData({ ...formData, validUntil: v })}
                        disabled={!isAuthorized}
                      >
                        <SelectTrigger className="bg-background/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lifetime">Lifetime</SelectItem>
                          <SelectItem value="custom">Custom Date</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {formData.validUntil === "custom" && (
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="validUntilDate">Expiration Date</Label>
                        <Input
                          id="validUntilDate"
                          type="date"
                          value={formData.validUntilDate}
                          onChange={(e) => setFormData({ ...formData, validUntilDate: e.target.value })}
                          className="bg-background/50"
                          disabled={!isAuthorized}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border/50">
                  <Button 
                    variant="outline" 
                    className="gap-2 border-accent/30 hover:border-accent"
                    onClick={handlePreview}
                    disabled={!isAuthorized || !formData.learnerName || !formData.certificateType || !formData.grade}
                  >
                    <ExternalLink className="h-4 w-4" />
                    Preview Certificate
                  </Button>
                  <Button 
                    variant="neon" 
                    className="gap-2 sm:ml-auto" 
                    size="lg"
                    onClick={handleGenerateCertificate}
                    disabled={!isAuthorized || !formData.learnerName || !formData.certificateType || !formData.completionDate || !formData.grade}
                  >
                    <QrCode className="h-4 w-4" />
                    Generate & Upload Certificate
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
