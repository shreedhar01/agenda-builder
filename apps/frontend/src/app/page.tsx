"use client"
import {Button} from "@repo/ui/components/button"

export default function Home() {
  return (
    <div className="flex justify-between">
      <Button onClick={()=> console.log("Hello world")}>Click Me</Button>
      <h1>Seriously</h1>
    </div>
  );
}
