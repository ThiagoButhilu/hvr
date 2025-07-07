import React, { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Upload, Eye, Trash2, X } from "lucide-react";
import { Room } from "../classes/room";

interface Environment {
  id: string;
  name: string;
  image360: string;
}

interface EnvironmentCardProps {
  environment: Room;
  onRemove: () => void;
  onUpdate: (updates: Partial<Room>) => void;
}

const EnvironmentCard = ({ environment, onRemove, onUpdate }: EnvironmentCardProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        environment.updateImage360(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleView360 = () => {
    if (environment.getImage360()) {
      // Aqui você pode implementar um modal ou página para visualizar a imagem 360°
      console.log("Visualizar 360°:", environment.getName());
      // Por enquanto, vamos apenas abrir em nova aba
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head>
              <title>Tour 360° - ${environment.getName()}</title>
              <style>
                body { margin: 0; padding: 20px; background: #f5f5f5; font-family: Arial, sans-serif; }
                h1 { text-align: center; color: #333; }
                img { width: 100%; max-width: 800px; height: 400px; object-fit: cover; border-radius: 8px; display: block; margin: 20px auto; }
                .info { text-align: center; color: #666; margin-top: 20px; }
              </style>
            </head>
            <body>
              <h1>Tour Virtual 360° - ${environment.getName()}</h1>
              <img src="${environment.getImage360()}" alt="Imagem 360° - ${environment.getName()}" />
              <div class="info">
                <p>💡 Em uma implementação real, aqui seria exibida uma visualização 360° interativa</p>
                <p>Os usuários poderiam arrastar para explorar todos os ângulos do ambiente</p>
              </div>
            </body>
          </html>
        `);
      }
    }
  };

  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Nome do ambiente"
              value={environment.getName()}
              onChange={(e) => environment.updateName(e.target.value)}
              className="font-medium text-lg border-none p-0 h-auto focus-visible:ring-0"
            />
            <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              360°
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {!environment.getImage360() ? (
          <div className="border-2 border-dashed border-purple-300 rounded-lg p-6 text-center bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white text-lg">360°</span>
            </div>
            <p className="text-slate-700 mb-2 font-medium">Adicione uma imagem 360°</p>
            <p className="text-sm text-slate-500 mb-4">
              Imagem panorâmica para tour virtual
            </p>
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              size="sm"
              className="border-purple-300 text-purple-600 hover:bg-purple-50"
            >
              <Upload className="w-4 h-4 mr-2" />
              Selecionar Imagem
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="relative group">
              <img
                src={environment.getImage360()}
                alt={`Imagem 360° - ${environment.getName()}`}
                className="w-full h-40 object-cover rounded-lg border-2 border-purple-200"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-lg">
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={handleView360}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Visualizar 360°
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleView360()}
                    className="bg-white/90 hover:bg-white text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* 360° Badge */}
              <div className="absolute top-2 left-2">
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                  360° Tour
                </Badge>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={handleView360}
                size="sm"
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Eye className="w-4 h-4 mr-2" />
                Visualizar 360°
              </Button>
              <Button
                onClick={() => fileInputRef.current?.click()}
                size="sm"
                variant="outline"
                className="border-purple-300 text-purple-600 hover:bg-purple-50"
              >
                <Upload className="w-4 h-4 mr-2" />
                Alterar
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnvironmentCard;
