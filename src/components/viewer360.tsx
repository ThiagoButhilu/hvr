import React, { useState, useRef } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Upload, Eye, RotateCw, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { Badge } from '../components/ui/badge';

const Property360Viewer = () => {
  const [property360Image, setProperty360Image] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setProperty360Image(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && viewerRef.current) {
      viewerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const openPreview = () => {
    if (property360Image) {
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head>
              <title>Tour 360° - Imóvel Completo</title>
              <style>
                body { 
                  margin: 0; 
                  padding: 0; 
                  background: #000; 
                  font-family: Arial, sans-serif;
                  overflow: hidden;
                }
                .viewer-container {
                  position: relative;
                  width: 100vw;
                  height: 100vh;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
                .viewer-image {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  cursor: grab;
                }
                .viewer-image:active {
                  cursor: grabbing;
                }
                .controls {
                  position: absolute;
                  top: 20px;
                  left: 20px;
                  background: rgba(0,0,0,0.7);
                  padding: 15px;
                  border-radius: 8px;
                  color: white;
                }
                .instructions {
                  position: absolute;
                  bottom: 20px;
                  left: 50%;
                  transform: translateX(-50%);
                  background: rgba(0,0,0,0.7);
                  padding: 10px 20px;
                  border-radius: 20px;
                  color: white;
                  font-size: 14px;
                }
              </style>
            </head>
            <body>
              <div class="viewer-container">
                <img src="${property360Image}" alt="Tour 360° do Imóvel" class="viewer-image" />
                <div class="controls">
                  <h3>🏠 Tour Virtual 360°</h3>
                  <p>Vista geral do imóvel</p>
                </div>
                <div class="instructions">
                  🖱️ Arraste para explorar • ESC para sair
                </div>
              </div>
              <script>
                let isDragging = false;
                let startX = 0;
                let startY = 0;
                const img = document.querySelector('.viewer-image');
                
                img.addEventListener('mousedown', (e) => {
                  isDragging = true;
                  startX = e.clientX;
                  startY = e.clientY;
                });
                
                document.addEventListener('mousemove', (e) => {
                  if (!isDragging) return;
                  const deltaX = e.clientX - startX;
                  const deltaY = e.clientY - startY;
                  // Simular rotação 360°
                  img.style.transform = \`translateX(\${deltaX * 0.5}px) translateY(\${deltaY * 0.3}px)\`;
                });
                
                document.addEventListener('mouseup', () => {
                  isDragging = false;
                  img.style.transform = 'none';
                });
                
                document.addEventListener('keydown', (e) => {
                  if (e.key === 'Escape') {
                    window.close();
                  }
                });
              </script>
            </body>
          </html>
        `);
      }
    }
  };

  return (
    <div className="space-y-4">
      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {!property360Image ? (
        <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center bg-gradient-to-br from-blue-50 to-cyan-50">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">360°</span>
          </div>
          <h3 className="text-lg font-medium text-slate-800 mb-2">
            Adicionar Vista Geral 360°
          </h3>
          <p className="text-sm text-slate-500 mb-4">
            Imagem panorâmica que mostra uma visão geral do imóvel
          </p>
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
          >
            <Upload className="w-4 h-4 mr-2" />
            Selecionar Imagem 360°
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div ref={viewerRef} className="relative group">
            <img
              src={property360Image}
              alt="Vista 360° do Imóvel"
              className="w-full h-64 object-cover rounded-lg border-2 border-blue-200"
            />
            
            {/* Overlay com controles */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-lg">
              <div className="flex space-x-3">
                <Button
                  size="sm"
                  onClick={openPreview}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Visualizar 360°
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-white/90 hover:bg-white"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Alterar
                </Button>
              </div>
            </div>

            {/* Badge 360° */}
            <div className="absolute top-3 left-3">
              <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                <span className="mr-1">🏠</span>
                Vista Geral 360°
              </Badge>
            </div>

            {/* Controles de navegação simulados */}
            <div className="absolute top-3 right-3 flex space-x-2">
              <div className="w-8 h-8 bg-black/30 rounded-full flex items-center justify-center">
                <RotateCw className="w-4 h-4 text-white" />
              </div>
              <div className="w-8 h-8 bg-black/30 rounded-full flex items-center justify-center">
                <ZoomIn className="w-4 h-4 text-white" />
              </div>
              <div className="w-8 h-8 bg-black/30 rounded-full flex items-center justify-center">
                <Maximize className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={openPreview}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            >
              <Eye className="w-4 h-4 mr-2" />
              Visualizar 360°
            </Button>
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="border-blue-300 text-blue-600 hover:bg-blue-50"
            >
              <Upload className="w-4 h-4 mr-2" />
              Alterar Imagem
            </Button>
          </div>

          <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
            <CardContent className="p-4">
              <h4 className="font-medium text-slate-800 mb-2">💡 Tour Virtual 360°</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Vista panorâmica completa do imóvel</li>
                <li>• Experiência imersiva para visitantes</li>
                <li>• Navegação interativa em 360 graus</li>
                <li>• Complementa os tours individuais dos ambientes</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Property360Viewer;
