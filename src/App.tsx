import { useState } from 'react';
import NavigationMenu from './components/header';
import {Input} from './components/ui/input';
import Categories from "./components/categories";
import Card from "./components/card";
import {Button} from './components/ui/button';
import { Search, Plus } from "lucide-react";


const properties = [
  {
    id: "227854103",
    code: "227854103",
    status: "published",
    title: "Studio",
    location: "ejdbd",
    image: "https://www.cashme.com.br/blog/wp-content/uploads/2020/03/marco-12.jpg",
    views: 0,
    date: "19/05/2021"
  },
  {
    id: "19052021",
    code: "19052021", 
    status: "published",
    title: "19052021",
    location: "Treinamento Rosa",
    image: "https://imgbr.imovelwebcdn.com/avisos/2/30/04/53/91/36/720x532/4772182180.jpg",
    views: 0,
    date: "28/04/2021"
  },
  {
    id: "30042021",
    code: "30042021",
    status: "draft",
    title: "Demonstração Abigail",
    location: "30042021",
    image: "https://fotos.sobressai.com.br/fotos/2248/2530801/34833083_m.jpg",
    views: 0,
    date: "22/04/2021"
  },
  {
    id: "15281528",
    code: "15281528",
    status: "published",
    title: "Treinamento Rosa",
    location: "28042021",
    image: "https://imgs2.cdn-imobibrasil.com.br/imagens/imoveis/202410161848089462.jpeg",
    views: 302,
    date: "05/03/2021"
  },
  {
    id: "45341534",
    code: "45341534",
    status: "published", 
    title: "Treinamento Marco",
    location: "22042021",
    image: "https://3cc791f55f295f1d.cdn.gocache.net/premium/img_vendas/i1_29969_188037_1349_160324.jpg",
    views: 302,
    date: "25/02/2022"
  },
  {
    id: "14371437",
    code: "14371437",
    status: "published",
    title: "Rua Taltal",
    location: "19042021",
    image: "https://simonecampagnoli.com.br/wp-content/uploads/2022/06/1-446.jpg",
    views: 302,
    date: "22/02/2021"
  }
];

function App() {

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>("published");

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.code.includes(searchTerm);
    const matchesFilter = activeFilter === "all" || property.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

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
                { key: "published", label: "📋 Publicados", count: 144 },
                { key: "draft", label: "📝 Rascunhos", count: 95 },
                { key: "all", label: "📊 Todos", count: 241 }
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
          {filteredProperties.map((property) => (
            <Card key={property.id} property={property} />
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

export default App;
