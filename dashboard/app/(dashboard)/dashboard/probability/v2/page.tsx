import React from "react";
import ProbabillityCalculator from "./components/ProbabillityCalculator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MinesweeperProbabilityCounter from "./components/MinesweeperProbabilityCounter";

export default function page() {
  return (
    <Tabs defaultValue="v2" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="v1">Probabillity Calculator v1</TabsTrigger>
        <TabsTrigger value="v2">Probability Calculator v2</TabsTrigger>
      </TabsList>
      <TabsContent value="v1">
        <ProbabillityCalculator />
      </TabsContent>
      <TabsContent value="v2">
        <MinesweeperProbabilityCounter />
      </TabsContent>
    </Tabs>
  );
}
