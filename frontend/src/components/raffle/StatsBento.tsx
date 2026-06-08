import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";

const stats = [
  {
    label: "Active Stakers",
    value: "1,204",
    barClass: "bg-primary w-2/3",
  },
  {
    label: "Yield Generated",
    value: "42.8 ETH",
    barClass: "bg-tertiary w-1/2",
    valueClass: "text-tertiary",
  },
  {
    label: "Total Raffles Run",
    value: "582",
    barClass: "bg-on-secondary-container w-4/5",
  },
  {
    label: "Protocol Security",
    value: "99.9%",
    barClass: "bg-primary w-full",
    valueClass: "text-primary",
    icon: "verified_user",
  },
];

export function StatsBento() {
  return (
    <section className="mt-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          variant="dashboard"
          className="p-lg border-white/5 flex flex-col"
        >
          <span className="text-on-surface-variant text-label-sm mb-xs">{stat.label}</span>
          <span
            className={`text-headline-md font-semibold text-on-surface flex items-center gap-xs ${stat.valueClass ?? ""}`}
          >
            {stat.value}
            {stat.icon && <Icon name={stat.icon} className="text-sm" />}
          </span>
          <div className="mt-md h-1 bg-surface-container rounded-full overflow-hidden">
            <div className={`h-full ${stat.barClass}`} />
          </div>
        </Card>
      ))}
    </section>
  );
}
