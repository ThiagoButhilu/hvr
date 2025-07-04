
import React from 'react';
import { ChevronDown, User, Globe, Settings, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../components/ui/dropdownMenu';
import { Button } from '../components/ui/button';
import icon from "../assets/image/logo_contract_hvr.png"

const NavigationMenu = () => {
  return (
    <nav className="w-full h-18 flex items-center justify-between px-6 shadow-md" style={{ backgroundColor: '#17C4BB' }}>
      {/* Logo */}
      <div className="flex items-center">
        <img src={icon} alt='logo'></img>
      </div>

      {/* Right side - Button and User Menu */}
      <div className="flex items-center space-x-4">
        {/* Vistoria Button */}
        <Button 
          className="text-white font-medium px-6 py-2 rounded-md hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#2a4967' }}
        >
          vistoria
        </Button>

        {/* User Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="flex items-center space-x-2 text-white hover:bg-white/10 px-3 py-2 rounded-md"
            >
              <User className="w-5 h-5" />
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent className="w-56 bg-white border border-gray-200 shadow-lg" align="end">
            <DropdownMenuLabel className="text-gray-700">Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            {/* Language Selection Submenu */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex items-center">
                <Globe className="mr-2 h-4 w-4" />
                <span>Idioma</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="bg-white border border-gray-200 shadow-lg">
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
                  🇧🇷 Português
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
                  🇺🇸 English
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
                  🇪🇸 Español
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            <DropdownMenuSeparator />
            
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
              <Settings className="mr-2 h-4 w-4" />
              <span>Configurações</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default NavigationMenu;
