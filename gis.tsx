import { useEffect } from "react";

import { Parser } from "@json2csv/plainjs";

import axios from "axios";

// Define a type for the category
type Category = {
  label: string;
  value: string;
};

type Feature = {
  attributes: Record<string, any>;
};

const fetchCountyData = async (
  county: string
): Promise<Record<string, any>[]> => {
  let allData: Record<string, any>[] = [];
  let offset = 0;
  let hasMoreData = true;
  const encodedCounty = encodeURIComponent(county);

  while (hasMoreData) {
    const url = `https://gis.fdot.gov/arcgis/rest/services/sso/ssogis/FeatureServer/2/query?where=COUNTY_TXT='${encodedCounty}'&outFields=%2A&returnGeometry=false&resultOffset=${offset}&resultRecordCount=5000&f=json`;
    const response = await axios.get(url);
    const features = response.data.features.map((feature: Feature) => {
      const attributes = feature.attributes;

      // Convert timestamp to human-readable date
      if (attributes.SKID_TEST_DATE) {
        const date = new Date(attributes.SKID_TEST_DATE);
        attributes.SKID_TEST_DATE = date.toLocaleDateString("en-US"); // Format as 'MM/DD/YYYY'
      }
      if (attributes.CRASH_DATE) {
        const date = new Date(attributes.CRASH_DATE);
        attributes.CRASH_DATE = date.toLocaleDateString("en-US"); // Format as 'MM/DD/YYYY'
      }

      return attributes;
    });

    if (features.length > 0) {
      allData = allData.concat(features);
      offset += 5000;
    } else {
      hasMoreData = false;
    }
  }

  return allData;
};

// const fetchData = async (offset: number): Promise<Record<string, any>[]> => {
//   const url = `https://gis.fdot.gov/arcgis/rest/services/sso/ssogis/FeatureServer/2/query?where=COUNTY_TXT%3D%27MIAMI-DADE%27&outFields=%2A&returnGeometry=false&resultOffset=${offset}&resultRecordCount=5000&f=json`;
//   const response = await axios.get(url);
//   return response.data.features.map((feature: Feature) => feature.attributes);
// };

const fetchData = async (): Promise<Record<string, any>[]> => {
  const counties = ["MIAMI-DADE", "BROWARD", "PALM BEACH"];
  let allCountyData: Record<string, any>[] = [];

  for (const county of counties) {
    const countyData = await fetchCountyData(county);
    allCountyData = allCountyData.concat(countyData);
  }

  return allCountyData;
};

const convertToCSV = (data: Record<string, any>[]): string => {
  const parser = new Parser();
  return parser.parse(data);
};

const downloadCSV = (csvString: string, filename: string): void => {
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// useEffect(() => {
//   (async () => {
//     let allData: any = [];
//     for (let offset = 0; offset < 30000; offset += 5000) {
//       const batchData = await fetchData(offset);
//       allData = allData.concat(batchData);
//     }

//     const csv = convertToCSV(allData);
//     downloadCSV(csv, "data.csv");
//   })();
// }, []);

useEffect(() => {
  (async () => {
    try {
      const allData = await fetchData();
      const csv = convertToCSV(allData);
      downloadCSV(csv, "data.csv");
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error appropriately
    }
  })();
}, []);
