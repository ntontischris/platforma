import React from 'react';
import Card from './ui/Card';
import { LineChart, Activity, Users, GraduationCap } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Total Students', value: '256', icon: Users, change: '+12%' },
    { label: 'Active Courses', value: '24', icon: GraduationCap, change: '+2.1%' },
    { label: 'Attendance Rate', value: '92%', icon: Activity, change: '+8.3%' },
    { label: 'Performance', value: '88%', icon: LineChart, change: '+5.2%' }
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold neon-text mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="stats-card">
            <div className="flex justify-between items-start">
              <div>
                <p className="stats-label">{stat.label}</p>
                <p className="stats-value mt-2">{stat.value}</p>
              </div>
              <div className="p-2 rounded-lg bg-neon-primary/10">
                <stat.icon className="w-6 h-6 text-neon-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-green-400 text-sm">{stat.change}</span>
              <span className="text-gray-400 text-sm ml-2">vs last month</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <Card className="col-span-1">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {['AI Content Generated', 'New Course Added', 'Student Progress Updated'].map((activity, index) => (
              <div key={index} className="flex items-center p-3 rounded-lg bg-cyber-dark/50">
                <Activity className="w-5 h-5 text-neon-primary mr-3" />
                <span className="text-gray-300">{activity}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="col-span-1">
          <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
          <div className="space-y-4">
            {[
              { label: 'Engagement Rate', value: 85 },
              { label: 'Content Quality', value: 92 },
              { label: 'Student Growth', value: 78 }
            ].map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300">{metric.label}</span>
                  <span className="text-neon-primary">{metric.value}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-value" 
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;