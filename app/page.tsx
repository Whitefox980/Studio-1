import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="p-4">
      <Button variant="default">Click me</Button>
      <Button variant="outline" size="lg">Large outline</Button>
    </div>
  )
}