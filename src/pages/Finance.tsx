import React from 'react';
import { Euro, TrendingUp, CreditCard, FileText } from 'lucide-react';
import Card from '../components/ui/Card';
import FinancialOverview from '../components/finance/FinancialOverview';
import PaymentsList from '../components/finance/PaymentsList';
import InvoiceGenerator from '../components/finance/InvoiceGenerator';
import ExpensesChart from '../components/finance/ExpensesChart';

const Finance = () => {
  const stats = [
    { icon: Euro, label: 'Συνολικά Έσοδα', value: '125.450€', change: '+15%' },
    { icon: CreditCard, label: 'Εκκρεμείς Πληρωμές', value: '12.350€', change: '-8%' },
    { icon: TrendingUp, label: 'Μηνιαία Έσοδα', value: '28.500€', change: '+12%' },
    { icon: FileText, label: 'Τιμολόγια', value: '245', change: '+5%' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Οικονομική Διαχείριση</h1>
        <p className="text-gray-600 mt-1">Επισκόπηση οικονομικών στοιχείων και συναλλαγών</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-blue-500 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={`text-sm font-medium ${
                stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
              }`}>
                {stat.change}
              </span>
              <span className="text-gray-400 text-sm ml-2">από τον προηγούμενο μήνα</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FinancialOverview />
        <ExpensesChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PaymentsList />
        </div>
        <InvoiceGenerator />
      </div>
    </div>
  );
};

export default Finance;