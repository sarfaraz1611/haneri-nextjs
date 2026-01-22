"use client";

import { Feature } from "./types";

interface ProductSpecificationsProps {
  features: Feature[];
}

export default function ProductSpecifications({
  features,
}: ProductSpecificationsProps) {
  if (!features || features.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-6 md:py-10">
      <h2 className="font-barlow text-2xl md:text-3xl text-[#2a5b57] mb-4 md:mb-6">
        Technical Specifications
      </h2>

      {/* Mobile View - Stacked Layout */}
      <div className="md:hidden space-y-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <div className="bg-gray-50 px-4 py-2.5 text-[#075E5E] font-semibold text-sm">
              {feature.feature_name}
            </div>
            <div className="px-4 py-2.5 text-gray-600 text-sm">
              {feature.feature_value}
            </div>
          </div>
        ))}
      </div>

      {/* Tablet and Desktop View - Table Layout */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            {features.reduce((rows: React.ReactElement[], feature, index) => {
              if (index % 2 === 0) {
                const nextFeature = features[index + 1];
                rows.push(
                  <tr key={index} className="border-b border-gray-200">
                    <th className="text-left py-3 px-3 lg:px-4 bg-gray-50 text-[#075E5E] font-semibold text-xs lg:text-sm w-1/4">
                      {feature.feature_name}
                    </th>
                    <td className="py-3 px-3 lg:px-4 text-gray-600 text-xs lg:text-sm w-1/4">
                      {feature.feature_value}
                    </td>
                    {nextFeature ? (
                      <>
                        <th className="text-left py-3 px-3 lg:px-4 bg-gray-50 text-[#075E5E] font-semibold text-xs lg:text-sm w-1/4">
                          {nextFeature.feature_name}
                        </th>
                        <td className="py-3 px-3 lg:px-4 text-gray-600 text-xs lg:text-sm w-1/4">
                          {nextFeature.feature_value}
                        </td>
                      </>
                    ) : (
                      <>
                        <th className="py-3 px-3 lg:px-4 bg-gray-50 w-1/4"></th>
                        <td className="py-3 px-3 lg:px-4 w-1/4"></td>
                      </>
                    )}
                  </tr>
                );
              }
              return rows;
            }, [])}
          </tbody>
        </table>
      </div>
    </section>
  );
}
