import { useState } from 'react';
import NavigationMenu from '../components/header';
import {Input} from '../components/ui/input';
import Categories from "../components/categories";
import Card from "../components/card";
import {Button} from '../components/ui/button';
import { Search, Plus } from "lucide-react";


import { houseData } from '../classes/houseData'; //exemplo de importação de casas



function Index() {

  console.log(houseData)

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<number>(1);

  const filteredProperties = houseData.filter(property => {
    const matchesSearch = property.getName().toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.getId().toString().includes(searchTerm);

    const matchesFilter = activeFilter === 5 || property.getStatus() === activeFilter;
    return matchesSearch && matchesFilter;
  });

  console.log(filteredProperties);

  return (
    <div className="App">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <NavigationMenu></NavigationMenu>
            {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between"> 
            
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                <Plus className="w-4 h-4 mr-2" />
                NOVO IMÓVEL
              </Button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64 bg-slate-50 border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                />
            
              
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        <Categories />

          {/* Filter Tabs */}
          <div className="mb-8">
            <div className="flex items-center space-x-1 bg-white rounded-xl p-1 shadow-sm border border-slate-200 w-fit">
              {[
                { key: 1, label: "📋 Publicados", count: 144 },
                { key: 0, label: "📝 Rascunhos", count: 95 },
                { key: 5, label: "📊 Todos", count: 241 }
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeFilter === filter.key
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md"
                      : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center">
              <span className="mr-2">🏠</span>
              Publicados
            </h2>
            <span className="text-sm text-slate-500">{filteredProperties.length} imóveis encontrados</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProperties.map((house) => (
            <Card key={house.getId()} house={house} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex items-center justify-center space-x-2">
          <Button variant="outline" size="sm" className="text-slate-600 border-slate-200 hover:bg-slate-50">
            1
          </Button>
          {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((page) => (
            <Button key={page} variant="ghost" size="sm" className="text-slate-500 hover:text-slate-700 hover:bg-slate-50">
              {page}
            </Button>
          ))}
          <Button variant="outline" size="sm" className="text-slate-600 border-slate-200 hover:bg-slate-50">
            12
          </Button>
          <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
            Next
          </Button>
        </div>
        </div>
      </div>
    </div>

    
  );
}

export default Index;
