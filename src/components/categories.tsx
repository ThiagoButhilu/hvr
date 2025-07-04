import { TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Todos",
    value: "241",
    bgColor: "bg-gradient-to-br from-purple-500 to-purple-600",
    icon: "📊"
  },
  {
    title: "Criados por mim", 
    value: "237",
    bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
    icon: "👤"
  },
  {
    title: "Não publicados",
    value: "95", 
    bgColor: "bg-gradient-to-br from-slate-500 to-slate-600",
    icon: "📝"
  },
  {
    title: "Publicados",
    value: "144",
    bgColor: "bg-gradient-to-br from-cyan-500 to-cyan-600", 
    icon: "✅"
  },
  {
    title: "Reservados",
    value: "2",
    bgColor: "bg-gradient-to-br from-orange-500 to-orange-600",
    icon: "🔒"
  }
];

const Categories = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgColor} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl">{stat.icon}</span>
            <TrendingUp className="w-5 h-5 opacity-70" />
          </div>
          
          <div>
            <p className="text-3xl font-bold mb-1">{stat.value}</p>
            <p className="text-sm opacity-90 font-medium">{stat.title}</p>
          </div>
          
          <div className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white/40 rounded-full w-3/4"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
