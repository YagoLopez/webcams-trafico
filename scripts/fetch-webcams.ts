import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import fs from 'fs/promises';
import path from 'path';

// Defined in types/webcam.ts but redefining here to keep script standalone or allow easy run
interface WebcamData {
  id: string;
  imageUrl: string;
  road: string;      // e.g., "A-6"
  kilometer: string; // e.g., "Pk 12.5"
  location: string;  // e.g., "Madrid, Moncloa"
  status: 'active' | 'offline'; // 'active' by default
}

const URL = 'https://nap.dgt.es/datex2/v3/dgt/DevicePublication/camaras_datex2_v36.xml';
const OUTPUT_FILE = path.resolve(__dirname, '../data/webcams.json');

// Helper to safely access nested properties
function get(obj: any, path: string[], defaultValue: any = undefined) {
  let current = obj;
  for (const key of path) {
    if (current === undefined || current === null) return defaultValue;
    current = current[key];
  }
  return current !== undefined ? current : defaultValue;
}

async function fetchWebcams() {
  try {
    console.log(`Fetching XML from ${URL}...`);
    const response = await axios.get(URL);
    const xmlData = response.data;

    console.log('Parsing XML...');
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_"
    });
    const jsonObj = parser.parse(xmlData);

    // The root element is usually d2:payload or similar, depending on namespace handling
    // We'll inspect the root keys just in case.
    const rootKey = Object.keys(jsonObj).find(key => key.includes('payload'));
    if (!rootKey) {
      console.error('Keys found:', Object.keys(jsonObj));
      throw new Error('Invalid XML structure: missing payload root');
    }

    const payload = jsonObj[rootKey];

    // Find device list key (ns2:device)
    const deviceKey = Object.keys(payload).find(key => key.includes('device') && !key.includes('header')); // ns2:device

    if (!deviceKey) {
      throw new Error('Invalid XML structure: missing device list');
    }

    const devicesRaw = payload[deviceKey];
    const deviceList = Array.isArray(devicesRaw) ? devicesRaw : [devicesRaw];

    console.log(`Found ${deviceList.length} devices.`);

    const webcams: WebcamData[] = [];

    for (const device of deviceList) {
      // Extract ID (attribute)
      const id = device['@_id'];

      // Image URL - look for key ending in deviceUrl
      const urlKey = Object.keys(device).find(key => key.includes('deviceUrl'));
      const imageUrl = urlKey ? device[urlKey] : null;

      if (!id || !imageUrl) continue;

      // Point Location
      const pointLocKey = Object.keys(device).find(key => key.includes('pointLocation'));
      const pointLocation = pointLocKey ? device[pointLocKey] : {};

      // Road Info
      // loc:supplementaryPositionalDescription -> loc:roadInformation
      let roadName = 'Unknown Road';
      let roadDest = '';

      // Helper to find key by partial string
      const findKey = (obj: any, partial: string) => obj ? Object.keys(obj).find(k => k.includes(partial)) : undefined;

      const suppKey = findKey(pointLocation, 'supplementaryPositionalDescription');
      if (suppKey) {
        const roadInfoKey = findKey(pointLocation[suppKey], 'roadInformation');
        if (roadInfoKey) {
          const info = pointLocation[suppKey][roadInfoKey];
          const nameKey = findKey(info, 'roadName');
          const destKey = findKey(info, 'roadDestination');
          if (nameKey) roadName = info[nameKey];
          if (destKey) roadDest = info[destKey];
        }
      }

      // Kilometer and Province
      // loc:tpegPointLocation -> loc:point -> loc:_tpegNonJunctionPointExtension -> loc:extendedTpegNonJunctionPoint
      let km = '';
      let province = '';

      const tpegKey = findKey(pointLocation, 'tpegPointLocation');
      if (tpegKey) {
        const pointKey = findKey(pointLocation[tpegKey], 'point');
        if (pointKey) {
          const point = pointLocation[tpegKey][pointKey];
          // Extension
          const extKey = Object.keys(point).find(k => k.includes('Extension'));
          if (extKey) {
            const innerExtKey = findKey(point[extKey], 'extendedTpegNonJunctionPoint');
            if (innerExtKey) {
              const data = point[extKey][innerExtKey];
              const kmKey = findKey(data, 'kilometerPoint');
              const provKey = findKey(data, 'province');
              if (kmKey) km = data[kmKey];
              if (provKey) province = data[provKey];
            }
          }
        }
      }

      const webcam: WebcamData = {
        id: String(id),
        imageUrl: String(imageUrl),
        road: String(roadName),
        kilometer: km ? `Pk ${km}${roadDest ? ' - ' + roadDest : ''}` : (roadDest || ''),
        location: province || 'Unknown',
        status: 'active' // Inferred active since it's in the list
      };

      webcams.push(webcam);
    }

    console.log(`Extracted ${webcams.length} valid webcams.`);

    console.log(`Writing to ${OUTPUT_FILE}...`);
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(webcams, null, 2));
    console.log('Success!');

  } catch (error) {
    console.error('Error fetching webcams:', error);
    process.exit(1);
  }
}

fetchWebcams();
