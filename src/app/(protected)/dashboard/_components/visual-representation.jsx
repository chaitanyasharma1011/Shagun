import PieChart from "@/components/graph/pie";
import React from "react";

export default function VisualRepresentation({ results }) {
  return (
    <div className="space-y-4 p-4 border border-[#eaeaea] rounded-lg">
      <h4 className="font-medium">Visual Representation</h4>
      <div className="flex justify-center space-x-24">
        <div className="space-y-4">
          <PieChart
            labels={Object.keys(results)}
            values={Object.values(results).map((value) => value?.recieved)}
            width={240}
            height={240}
          />
          <p className="text-center">Recieved Representation</p>
        </div>
        <div className="space-y-4">
          <PieChart
            labels={Object.keys(results)}
            values={Object.values(results).map((value) => value?.contributed)}
            width={240}
            height={240}
          />
          <p className="text-center">Contribution Representation</p>
        </div>
      </div>
    </div>
  );
}
