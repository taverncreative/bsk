import { Users, CreditCard, Clock, Activity, ArrowUpRight } from 'lucide-react';

const stats = [
  { name: 'Total Active Clients', stat: '24', icon: Users, change: '+2 this month', changeType: 'increase' },
  { name: 'Monthly Recurring Revenue', stat: '£8,450', icon: CreditCard, change: '+12%', changeType: 'increase' },
  { name: 'Hours Allocated', stat: '112 hrs', icon: Clock },
  { name: 'Hours Used (MTD)', stat: '45 hrs', icon: Activity },
];

export default function AdminOverview() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Agency Control Centre</h1>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                    <ArrowUpRight className="self-center flex-shrink-0 h-5 w-5 text-red-400 transform rotate-180" aria-hidden="true" />
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
          <h2 className="text-lg leading-6 font-medium text-white mb-4">Smart Alerts</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-yellow-400 bg-yellow-400/10 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Activity className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-200">
                    <span className="font-bold">Traffic Drop:</span> Apex Builders site traffic down 15% WoW.
                  </p>
                </div>
              </div>
            </div>
            <div className="border-l-4 border-red-500 bg-red-500/10 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Users className="h-5 w-5 text-red-500" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-200">
                    <span className="font-bold">Inactivity:</span> Kent Roofing has not logged in for 35 days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-950 shadow rounded-lg px-4 py-5 sm:p-6 border border-zinc-800">
          <h2 className="text-lg leading-6 font-medium text-white mb-4">Pipeline Snapshot</h2>
          <div className="flow-root">
            <ul className="-my-5 divide-y divide-zinc-800">
              <li className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">Maidstone Plumbers Ltd</p>
                    <p className="text-sm text-zinc-400 truncate">Proposal Sent — £350/mo</p>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/50 text-blue-200">
                      In Progress
                    </span>
                  </div>
                </div>
              </li>
              <li className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">Top Tier Decorators</p>
                    <p className="text-sm text-zinc-400 truncate">Discovery Call — £200/mo</p>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-900/50 text-purple-200">
                      Scheduled
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}