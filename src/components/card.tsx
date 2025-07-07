import { Eye, Edit3, MoreVertical, Calendar, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdownMenu";
import { BrowserRouter, useNavigate, Routes, Route } from "react-router-dom";

import { House } from "../classes/house";

interface HouseCardProps {
  house: House;
}




const EnvironmentCard = ({ house }: HouseCardProps) => {

 const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/property/${house.getId()}/edit`);
  };

  const getStatusBadge = (status: number) => {
    const statusStyles = {
      0: "bg-gray-500 text-white",
      1: "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white",
      2: "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
    };

    const statusLabels = {
      0: "📝 Rascunho",
      1: "✅ Publicado",
      2: "🔒 Reservado"
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status as keyof typeof statusStyles] || statusStyles[1]}`}>
        {statusLabels[status as keyof typeof statusLabels] || "📝 Rascunho"}
      </span>
    );
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 hover:border-blue-200 group">
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <img 
            src={house.getThumbnail()} 
            alt={house.getName()}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            {getStatusBadge(house.getStatus())}
          </div>
          
          {/* Views Badge */}
          <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
            <Eye className="w-3 h-3 text-white" />
            <span className="text-xs text-white font-medium">{house.getViews()}</span>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Action Buttons */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">

            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="secondary" className="bg-white/90 backdrop-blur-sm hover:bg-white">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm">
              <DropdownMenuItem 
                className="flex items-center space-x-2"
                onClick={handleEdit}
              >
                <Edit3 className="w-4 h-4" />
                <span>Editar</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>Visualizar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Code */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
              #{house.getCode()}
            </span>
            <span className="text-xs text-slate-500 flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {house.getDate().toLocaleDateString()}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-slate-800 mb-2 text-lg group-hover:text-blue-600 transition-colors">
            {house.getName()}
          </h3>

          {/* Location */}
          <div className="flex items-center text-slate-500 text-sm mb-4">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{house.getAddress().city}</span>
          </div>

          {/* Action Button */}
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full border-slate-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
            
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Gerenciar Imóvel
          </Button>
        </div>
      </div>
    </>
  );
};

export default EnvironmentCard;