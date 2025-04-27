import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="p-4 space-y-4">
      <Input placeholder="Search destinations..." />
      <Button>Search</Button>
      
      <Card>
        <CardHeader>
          <h3>Featured Destination</h3>
        </CardHeader>
        <CardContent>
          <p>Explore amazing places</p>
        </CardContent>
      </Card>
    </div>
  );
}