import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code } from 'lucide-react';

export default function AdminTools() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">CLI Tools</h1>
        <p className="text-muted-foreground">Run maintenance scripts from the server directory.</p>
      </div>
      <Card className="border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5 text-cyan-500" />
            Launch Readiness
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>Generate a deployment readiness report from the command line.</p>
          <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
{`npm run tools readiness`}
          </pre>
        </CardContent>
      </Card>
      <Card className="border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5 text-cyan-500" />
            Billing Products
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>List available subscription tiers and add-ons.</p>
          <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
{`npm run tools products`}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
