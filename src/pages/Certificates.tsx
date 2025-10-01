import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, Download, ExternalLink, Award } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function Certificates() {
  const certificates = [
    {
      id: "CERT-2024-001234",
      qualification: "Bachelor of Technology in Computer Science",
      issuer: "ISM Dhanbad",
      issueDate: "2024-03-15",
      grade: "A+",
      status: "active",
    },
    {
      id: "CERT-2023-005678",
      qualification: "Advanced Diploma in Artificial Intelligence",
      issuer: "BIT Sindri",
      issueDate: "2023-11-20",
      grade: "A",
      status: "active",
    },
    {
      id: "CERT-2023-002341",
      qualification: "Certificate in Blockchain Development",
      issuer: "Blockchain Academy",
      issueDate: "2023-08-10",
      grade: "A+",
      status: "active",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-12 blockchain-grid">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12 space-y-4">
            <h1 className="font-heading text-4xl md:text-5xl font-bold">
              My <span className="text-accent">Certificates</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              View and manage your blockchain-verified credentials
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-card/50 backdrop-blur-sm border-accent/20">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent">{certificates.length}</p>
                  <p className="text-sm text-muted-foreground">Total Certificates</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <QrCode className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent">{certificates.length}</p>
                  <p className="text-sm text-muted-foreground">Active Credentials</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <ExternalLink className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent">100%</p>
                  <p className="text-sm text-muted-foreground">Verified</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Certificate Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <Card 
                key={cert.id}
                className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-card group cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge 
                      variant="default" 
                      className="bg-accent/10 text-accent border-accent/20 hover:bg-accent/20"
                    >
                      {cert.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground font-mono">{cert.id}</span>
                  </div>
                  <CardTitle className="font-heading text-lg leading-tight group-hover:text-accent transition-colors">
                    {cert.qualification}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Issued By:</span>
                      <span className="font-medium">{cert.issuer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Issue Date:</span>
                      <span className="font-medium">{cert.issueDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Grade:</span>
                      <span className="font-semibold text-accent">{cert.grade}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/50 grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="border-accent/30 hover:border-accent gap-2">
                      <QrCode className="h-3 w-3" />
                      QR
                    </Button>
                    <Button variant="outline" size="sm" className="border-accent/30 hover:border-accent gap-2">
                      <Download className="h-3 w-3" />
                      PDF
                    </Button>
                  </div>
                  
                  <Button variant="neon" size="sm" className="w-full gap-2">
                    <ExternalLink className="h-3 w-3" />
                    Add to DigiLocker
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {certificates.length === 0 && (
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="py-16 text-center space-y-4">
                <Award className="h-16 w-16 text-muted-foreground mx-auto opacity-50" />
                <div className="space-y-2">
                  <h3 className="font-heading text-xl font-semibold">No Certificates Yet</h3>
                  <p className="text-muted-foreground">
                    Your earned certificates will appear here
                  </p>
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
