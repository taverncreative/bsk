import { Users, Eye, Mail, CheckCircle, Clock, ArrowUpRight, ArrowDownRight, FileText } from 'lucide-react';

const stats = [
  { name: 'Website Traffic (30d)', stat: '2,412', icon: Users, change: '12%', changeType: 'increase' },
  { name: 'SEO Visibility Trend', stat: '+4 Pos', icon: Eye, change: 'Top 3 keywords', changeType: 'increase' },
  { name: 'Enquiries Generated', stat: '18', icon: Mail, change: '+5', changeType: 'increase' },
  { name: 'Tasks Completed', stat: '14', icon: CheckCircle },
  { name: 'Hours Used', stat: '3.5 / 5', icon: Clock },
];

export default function ClientOverview() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative bg-zinc-950 pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden border border-zinc-800"
          >
            <dt>
              <div className="absolute bg-brand-gold/20 rounded-md p-3">
                <item.icon className="h-6 w-6 text-brand-gold" aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-zinc-400 truncate">{item.name}</p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-white">{item.stat}</p>
              {item.change && (
                <p
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    item.changeType === 'increase' ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {item.changeType === 'increase' ? (
                    <ArrowUpRight className="self-center flex-shrink-0 h-5 w-5 text-green-400" aria-hidden="true" />
                  ) : (
                    <ArrowDownRight className="self-center flex-shrink-0 h-5 w-5 text-red-400" aria-hidden="true" />
                  )}
                  <span className="sr-only">
                    {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by
                  </span>
                  {item.change}
                </p>
              )}
            </dd>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="bg-zinc-950 shadow rounded-lg px-4 py-5 sm:p-6 border border-zinc-800">
          <h2 className="text-lg leading-6 font-medium text-white mb-4">Recent Strategy Updates</h2>
          <div className="flow-root">
            <ul className="-mb-8">
              <li className="relative pb-8">
                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-zinc-800" aria-hidden="true"></span>
                <div className="relative flex space-x-3">
                  <div>
                    <span className="h-8 w-8 rounded-full bg-brand-gold/20 flex items-center justify-center ring-8 ring-zinc-950">
                      <CheckCircle className="h-5 w-5 text-brand-gold" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    <div>
                      <p className="text-sm text-zinc-400">Deployed high-converting Maidstone landing page</p>
                    </div>
                    <div className="text-right text-sm whitespace-nowrap text-zinc-500">
                      <time dateTime="2026-03-12">Mar 12</time>
                    </div>
                  </div>
                </div>
              </li>
              <li className="relative pb-8">
                <div className="relative flex space-x-3">
                  <div>
                    <span className="h-8 w-8 rounded-full bg-brand-gold/20 flex items-center justify-center ring-8 ring-zinc-950">
                      <CheckCircle className="h-5 w-5 text-brand-gold" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    <div>
                      <p className="text-sm text-zinc-400">Optimized Google Business Profile posts for keyword relevancy</p>
                    </div>
                    <div className="text-right text-sm whitespace-nowrap text-zinc-500">
                      <time dateTime="2026-03-08">Mar 8</time>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-zinc-950 shadow rounded-lg px-4 py-5 sm:p-6 border border-zinc-800">
          <h2 className="text-lg leading-6 font-medium text-white mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <button className="w-full flex justify-between items-center px-4 py-3 border border-zinc-800 rounded-md shadow-sm text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 transition-colors">
              Submit Website Request
              <ArrowUpRight className="ml-3 h-5 w-5 text-brand-gold" />
            </button>
            <button className="w-full flex justify-between items-center px-4 py-3 border border-zinc-800 rounded-md shadow-sm text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 transition-colors">
              View Monthly Report
              <FileText className="ml-3 h-5 w-5 text-brand-gold" />
            </button>
            <button className="w-full flex justify-between items-center px-4 py-3 border border-zinc-800 rounded-md shadow-sm text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 transition-colors">
              Adjust Plan Hours
              <Clock className="ml-3 h-5 w-5 text-brand-gold" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}