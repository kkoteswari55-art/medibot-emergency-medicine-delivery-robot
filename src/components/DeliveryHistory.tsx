import React, { useState } from 'react';
import { useRobot } from '../context/RobotContext';
import { DeliveryRecord } from '../types';
import {
  Search,
  Filter,
  Download,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Package,
  X,
  Printer,
} from 'lucide-react';

export const DeliveryHistory: React.FC = () => {
  const { t, deliveries } = useRobot();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedReceipt, setSelectedReceipt] = useState<DeliveryRecord | null>(null);

  // Filter deliveries
  const filtered = deliveries.filter((item) => {
    const matchesSearch =
      item.medicineName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.destinationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.recipientName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const exportCSV = () => {
    const headers = [
      'Delivery ID',
      'Medicine',
      'Quantity',
      'Destination',
      'Priority',
      'Status',
      'Created At',
      'Delivered At',
      'Recipient',
    ];
    const rows = filtered.map((d) => [
      d.id,
      `"${d.medicineName}"`,
      `"${d.quantity}"`,
      `"${d.destinationName}"`,
      d.priority,
      d.status,
      d.createdAt,
      d.deliveredAt || 'N/A',
      `"${d.recipientName}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `medibot_delivery_audit_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: DeliveryRecord['status']) => {
    switch (status) {
      case 'delivered':
        return (
          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" /> Delivered
          </span>
        );
      case 'in_progress':
        return (
          <span className="flex items-center gap-1 text-xs font-semibold text-teal-400 animate-pulse">
            <Clock className="h-3.5 w-3.5" /> In Progress
          </span>
        );
      case 'failed':
        return (
          <span className="flex items-center gap-1 text-xs font-semibold text-rose-400">
            <AlertCircle className="h-3.5 w-3.5" /> Failed
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-xs font-semibold text-slate-400">
            Pending
          </span>
        );
    }
  };

  const getPriorityBadge = (priority: DeliveryRecord['priority']) => {
    switch (priority) {
      case 'critical':
        return <span className="text-xs font-bold text-rose-400 uppercase tracking-wide">CRITICAL</span>;
      case 'urgent':
        return <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">URGENT</span>;
      default:
        return <span className="text-xs font-medium text-slate-300 uppercase tracking-wide">NORMAL</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Search and Export */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white font-sans">{t.historyTitle}</h3>
          <p className="text-xs text-slate-400">{t.historySubtitle}</p>
        </div>

        <button
          onClick={exportCSV}
          className="flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3.5 py-2 text-xs font-semibold text-slate-200 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Download className="h-4 w-4 text-teal-400" />
          <span>{t.exportCsv}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full rounded-xl border border-slate-800 bg-slate-900/80 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-teal-500 focus:outline-none"
          />
        </div>

        {/* Status Filter Segmented Controls */}
        <div className="flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-900/80 p-1">
          {['all', 'in_progress', 'delivered', 'failed'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors capitalize ${
                statusFilter === st
                  ? 'bg-teal-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {st === 'all' ? t.filterAll : st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm shadow-xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400">
              <th className="py-3.5 px-4 font-semibold">{t.colDeliveryId}</th>
              <th className="py-3.5 px-4 font-semibold">{t.colMedicine}</th>
              <th className="py-3.5 px-4 font-semibold">{t.colDestination}</th>
              <th className="py-3.5 px-4 font-semibold">{t.colPriority}</th>
              <th className="py-3.5 px-4 font-semibold">{t.colDateTime}</th>
              <th className="py-3.5 px-4 font-semibold">{t.colStatus}</th>
              <th className="py-3.5 px-4 font-semibold text-right">{t.colActions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-slate-200">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-500">
                  No matching deliveries found.
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-medium text-cyan-300">
                    {item.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-white">{item.medicineName}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{item.quantity}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-slate-300 font-medium">{item.destinationName}</div>
                    <div className="text-[11px] text-slate-500 truncate max-w-[160px]">
                      To: {item.recipientName}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">{getPriorityBadge(item.priority)}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-400">
                    <div>{item.createdAt}</div>
                    {item.deliveredAt && (
                      <div className="text-[10px] text-emerald-400">Done: {item.deliveredAt}</div>
                    )}
                  </td>
                  <td className="py-3.5 px-4">{getStatusBadge(item.status)}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedReceipt(item)}
                      className="rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-300 hover:text-teal-200 px-2.5 py-1 text-xs font-medium transition-colors"
                    >
                      View Receipt
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Official Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
            <button
              onClick={() => setSelectedReceipt(null)}
              className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white font-sans">{t.receiptTitle}</h4>
                <p className="text-xs text-slate-400 font-mono">MANIFEST ID: {selectedReceipt.id}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-3 text-xs">
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Medicine Payload:</span>
                <span className="font-bold text-white">{selectedReceipt.medicineName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Quantity Dispatched:</span>
                <span className="font-mono text-cyan-300">{selectedReceipt.quantity}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Pickup Location:</span>
                <span className="text-slate-200">{selectedReceipt.pickupLocation}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Destination Room:</span>
                <span className="font-semibold text-emerald-400">{selectedReceipt.destinationName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Priority Level:</span>
                <span className="font-bold uppercase text-amber-400">{selectedReceipt.priority}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Authorized Recipient:</span>
                <span className="text-white">{selectedReceipt.recipientName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Timestamp:</span>
                <span className="font-mono text-slate-300">{selectedReceipt.createdAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Telemetry Status:</span>
                <span className="font-bold text-teal-300 capitalize">{selectedReceipt.status}</span>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:text-white"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Print Slip</span>
              </button>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 px-4 py-2 text-xs font-bold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
