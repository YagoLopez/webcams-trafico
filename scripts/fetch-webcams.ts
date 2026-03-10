import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import fs from 'fs/promises';
import path from 'path';

// Defined in types/webcam.ts but redefining here to keep script standalone or allow easy run
interface WebcamData {
  id: string;
  imageUrl: string;
  roadName: string;      // e.g., "A-6"
  roadDestination: string; // e.g., "Villalba"
  kilometer: string; // e.g., "Pk 12.5"
  location: string;  // e.g., "Madrid, Moncloa"
  latitude?: number;
  longitude?: number;
  status: 'active' | 'offline'; // 'active' by default
}

const URL = 'https://nap.dgt.es/datex2/v3/dgt/DevicePublication/camaras_datex2_v36.xml';
const OUTPUT_FILE = path.resolve(__dirname, '../data/webcams.json');

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

      // Location coordinates, Kilometer and Province
      // loc:tpegPointLocation -> loc:point -> loc:_tpegNonJunctionPointExtension -> loc:extendedTpegNonJunctionPoint
      let km = '';
      let province = '';
      let latitude: number | undefined = undefined;
      let longitude: number | undefined = undefined;

      const tpegKey = findKey(pointLocation, 'tpegPointLocation');
      if (tpegKey) {
        const pointKey = findKey(pointLocation[tpegKey], 'point');
        if (pointKey) {
          const point = pointLocation[tpegKey][pointKey];

          // Coordinates
          const coordsKey = findKey(point, 'pointCoordinates');
          if (coordsKey) {
            const coords = point[coordsKey];
            const latKey = findKey(coords, 'latitude');
            const lngKey = findKey(coords, 'longitude');
            if (latKey && coords[latKey]) latitude = Number(coords[latKey]);
            if (lngKey && coords[lngKey]) longitude = Number(coords[lngKey]);
          }

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
        roadName: String(roadName),
        roadDestination: String(roadDest),
        kilometer: km ? `Pk ${km}` : '',
        location: province || 'Unknown',
        latitude,
        longitude,
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
