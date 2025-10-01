import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, UserPlus, Building2, ShieldCheck, ShieldOff } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function Roles() {
  const [institutions, setInstitutions] = useState([
    {
      id: "1",
      name: "ISM Dhanbad",
      wallet: "0x742d...5e2f",
      status: "active",
      certifiers: 12,
    },
    {
      id: "2",
      name: "BIT Sindri",
      wallet: "0x893a...7c4d",
      status: "active",
      certifiers: 8,
    },
  ]);

  const [certifiers, setCertifiers] = useState([
    {
      id: "1",
      name: "Dr. DK Singh",
      wallet: "0x234b...9e1a",
      role: "Senior Certifier",
      status: "active",
    },
    {
      id: "2",
      name: "Prof. Ghanshayam",
      wallet: "0x567c...2f3b",
      role: "Certifier",
      status: "active",
    },
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-12 blockchain-grid">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12 space-y-4">
            <h1 className="font-heading text-4xl md:text-5xl font-bold">
              Manage <span className="text-accent">Roles</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Control access and permissions for institutions and certifiers
            </p>
          </div>

          <Tabs defaultValue="institutions" className="space-y-6">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="institutions" className="gap-2">
                <Building2 className="h-4 w-4" />
                Institutions
              </TabsTrigger>
              <TabsTrigger value="certifiers" className="gap-2">
                <UserPlus className="h-4 w-4" />
                Certifiers
              </TabsTrigger>
            </TabsList>

            {/* Institutions Tab */}
            <TabsContent value="institutions">
              <Card className="shadow-card bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="font-heading text-2xl">Institutions</CardTitle>
                      <CardDescription>Manage registered educational institutions</CardDescription>
                    </div>
                    <Button variant="neon" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Institution
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border border-border/50 overflow-hidden">
                    <Table>
                      <TableHeader className="bg-secondary/50">
                        <TableRow>
                          <TableHead>Institution Name</TableHead>
                          <TableHead>Wallet Address</TableHead>
                          <TableHead>Certifiers</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {institutions.map((inst) => (
                          <TableRow key={inst.id} className="hover:bg-secondary/20">
                            <TableCell className="font-medium">{inst.name}</TableCell>
                            <TableCell className="font-mono text-sm">{inst.wallet}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="border-accent/30">
                                {inst.certifiers} active
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={inst.status === "active" ? "default" : "secondary"}
                                className={inst.status === "active" ? "bg-accent/10 text-accent border-accent/20" : ""}
                              >
                                {inst.status === "active" ? (
                                  <ShieldCheck className="h-3 w-3 mr-1" />
                                ) : (
                                  <ShieldOff className="h-3 w-3 mr-1" />
                                )}
                                {inst.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" className="hover:text-destructive">
                                Deactivate
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Certifiers Tab */}
            <TabsContent value="certifiers">
              <Card className="shadow-card bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="font-heading text-2xl">Certifiers</CardTitle>
                      <CardDescription>Manage authorized certificate issuers</CardDescription>
                    </div>
                    <Button variant="neon" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Certifier
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <Input
                      placeholder="Search certifiers by name or wallet address..."
                      className="max-w-md bg-background/50"
                    />
                  </div>
                  <div className="rounded-lg border border-border/50 overflow-hidden">
                    <Table>
                      <TableHeader className="bg-secondary/50">
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Wallet Address</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {certifiers.map((cert) => (
                          <TableRow key={cert.id} className="hover:bg-secondary/20">
                            <TableCell className="font-medium">{cert.name}</TableCell>
                            <TableCell className="font-mono text-sm">{cert.wallet}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="border-accent/30">
                                {cert.role}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={cert.status === "active" ? "default" : "secondary"}
                                className={cert.status === "active" ? "bg-accent/10 text-accent border-accent/20" : ""}
                              >
                                {cert.status === "active" ? (
                                  <ShieldCheck className="h-3 w-3 mr-1" />
                                ) : (
                                  <ShieldOff className="h-3 w-3 mr-1" />
                                )}
                                {cert.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right space-x-2">
                              <Button variant="ghost" size="sm" className="hover:text-accent">
                                Edit
                              </Button>
                              <Button variant="ghost" size="sm" className="hover:text-destructive">
                                Deactivate
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {/* Create Template Card */}
              <Card className="shadow-card bg-card/50 backdrop-blur-sm border-accent/20 mt-6">
                <CardHeader>
                  <CardTitle className="font-heading text-xl">Certificate Templates</CardTitle>
                  <CardDescription>Create and manage certificate templates for issuance</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full border-accent/30 hover:border-accent gap-2">
                    <Plus className="h-4 w-4" />
                    Create New Template
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
