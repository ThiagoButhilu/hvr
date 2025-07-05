import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowLeft, Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import EnvironmentCard from "../components/ambientCard"
import VirtualTourBuilder from "../components/builder";
import Property360Viewer from "../components/viewer360";

interface PropertyFormData {
  title: string;
  location: string;
  status: string;
  description: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  type: string;
}

interface Environment {
  id: string;
  name: string;
  image360: string;
}

// Mock data - in real app this would come from API
const mockProperty = {
  id: "227854103",
  code: "227854103",
  status: "published",
  title: "Studio",
  location: "ejdbd",
  image: "/lovable-uploads/dcd5960d-e38a-42a4-b10e-9812d6033010.png",
  views: 0,
  date: "19/05/2021"
};

const PropertyEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [environments, setEnvironments] = useState<Environment[]>([
    { id: "1", name: "Entrada", image360: "" },
    { id: "2", name: "Sala de Jantar", image360: "" }
  ]);

  const form = useForm<PropertyFormData>({
    defaultValues: {
      title: mockProperty.title,
      location: mockProperty.location,
      status: mockProperty.status,
      description: "",
      price: "",
      bedrooms: "2",
      bathrooms: "1",
      area: "",
      type: "apartment"
    }
  });

  const onSubmit = (data: PropertyFormData) => {
    console.log("Form data:", data);
    console.log("Environments:", environments);
    // Aqui você implementaria a lógica para salvar os dados
    navigate("/");
  };

  const addEnvironment = () => {
    const newEnvironment: Environment = {
      id: Date.now().toString(),
      name: "",
      image360: ""
    };
    setEnvironments([...environments, newEnvironment]);
  };

  const updateEnvironment = (id: string, updates: Partial<Environment>) => {
    setEnvironments(environments.map(env => 
      env.id === id ? { ...env, ...updates } : env
    ));
  };

  const removeEnvironment = (id: string) => {
    setEnvironments(environments.filter(env => env.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar</span>
              </Button>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-slate-800">
                  Editar Imóvel - #{mockProperty.code}
                </h1>
                <Badge variant={mockProperty.status === "published" ? "default" : "secondary"}>
                  {mockProperty.status === "published" ? "Publicado" : "Rascunho"}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => navigate("/")}>
                Cancelar
              </Button>
              <Button 
                onClick={form.handleSubmit(onSubmit)}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
              >
                Salvar Alterações
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Detalhes</TabsTrigger>
            <TabsTrigger value="environments">Ambientes 360°</TabsTrigger>
            <TabsTrigger value="virtual-tour">Tour Virtual</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Título do Imóvel</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Apartamento Moderno" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione o status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="draft">Rascunho</SelectItem>
                                <SelectItem value="published">Publicado</SelectItem>
                                <SelectItem value="reserved">Reservado</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Localização</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Rua das Flores, 123 - Centro" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descrição</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Descreva as características do imóvel..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preço (R$)</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: 350.000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tipo</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Tipo do imóvel" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="apartment">Apartamento</SelectItem>
                                <SelectItem value="house">Casa</SelectItem>
                                <SelectItem value="studio">Studio</SelectItem>
                                <SelectItem value="commercial">Comercial</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="bedrooms"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quartos</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="bathrooms"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Banheiros</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="area"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Área (m²)</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: 80" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="environments" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-800">Ambientes 360°</h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Adicione tours virtuais 360° para cada ambiente do imóvel
                  </p>
                </div>
                <Button 
                  onClick={addEnvironment}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Ambiente
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {environments.map((environment) => (
                  <EnvironmentCard
                    key={environment.id}
                    environment={environment}
                    onUpdate={(updates) => updateEnvironment(environment.id, updates)}
                    onRemove={() => removeEnvironment(environment.id)}
                  />
                ))}
              </div>

              {environments.length === 0 && (
                <Card className="border-2 border-dashed border-purple-300">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl">360°</span>
                    </div>
                    <h3 className="text-lg font-medium text-slate-800 mb-2">
                      Nenhum ambiente adicionado
                    </h3>
                    <p className="text-sm text-slate-500 mb-4">
                      Adicione ambientes com tours 360° para uma experiência imersiva
                    </p>
                    <Button 
                      onClick={addEnvironment}
                      variant="outline"
                      className="border-purple-300 text-purple-600 hover:bg-purple-50"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar Primeiro Ambiente
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="virtual-tour" className="mt-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-slate-800">Tour Virtual Interativo</h2>
                <p className="text-sm text-slate-500 mt-1">
                  Configure o fluxo do tour virtual conectando os ambientes
                </p>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xs">1</span>
                      <span>Configurar Fluxo dos Ambientes</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <VirtualTourBuilder environments={environments} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-xs">2</span>
                      <span>Visualizador 360° do Imóvel</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Property360Viewer />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PropertyEdit;