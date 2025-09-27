import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Componente para o Tooltip customizado
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="font-semibold">{`Data: ${label}`}</p>
        <p className="text-primary font-medium">{`Vendas: ${payload[0].value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}</p>
      </div>
    );
  }
  return null;
};

export default function SalesChart({ data }) {

  const primaryColor = "#1e40af"
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
      >
        <defs>
          <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={primaryColor} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={primaryColor} stopOpacity={0.2}/>
          </linearGradient>
        </defs>
        
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
        
        <XAxis 
          dataKey="name" 
          stroke="currentColor" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
        />
        
        <YAxis 
          stroke="currentColor" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false}
          tickFormatter={(value) => `R$ ${value}`}
        />
        
        <Tooltip 
          content={<CustomTooltip />} 
          cursor={{ fill: 'transparent' }}
        />
        
        <Bar 
          dataKey="Vendas" 
          fill="url(#colorVendas)" 
          radius={[4, 4, 0, 0]}
          name="Vendas (R$)" 
        />
      </BarChart>
    </ResponsiveContainer>
  );
}