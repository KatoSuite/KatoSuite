import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wrench, Rocket, DollarSign, Users } from 'lucide-react';

export default function AdminDashboard() {
  const tools = [
    {
      title: 'Launch Readiness',
      icon: Rocket,
      href: '/launch-readiness',
      description: 'Run deployment readiness assessment.'
    },
    {
      title: 'Billing Products',
      icon: DollarSign,
      href: '/pricing',
      description: 'Review subscription plans and prices.'
    },
    {
      title: 'User Management',
      icon: Users,
      href: '#',
      description: 'Manage platform users (coming soon).'
    },
    {
      title: 'CLI Tools',
      icon: Wrench,
      href: '/admin/tools',
      description: 'Access server maintenance scripts.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Administrative utilities for KatoSuite</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tools.map(({ title, icon: Icon, href, description }) => (
          <Card key={title} className="border">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-cyan-500" />
                <CardTitle className="text-sm">{title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{description}</p>
              <Button asChild variant="outline" size="sm">
                <Link href={href}>Open</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
