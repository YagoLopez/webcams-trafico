import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import fs from 'fs';
import path from 'path';

// Internal type definition so the route depends entirely on itself
export interface CamData {
  id: string;
  imageUrl: string;
  road: string;
  kilometer: string;
  location: string;
  status: 'active' | 'offline';
  latitude?: number;
  longitude?: number;
}

const URL = 'https://nap.dgt.es/datex2/v3/dgt/DevicePublication/camaras_datex2_v36.xml';

export async function GET(request: Request) {
  try {
    const response = await axios.get(URL);
    const xmlData = response.data;

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_"
    });
    const jsonObj = parser.parse(xmlData);

    const rootKey = Object.keys(jsonObj).find(key => key.includes('payload'));
    if (!rootKey) {
      return Response.json({ error: 'Invalid XML structure: missing payload root' }, { status: 500 });
    }

    const payload = jsonObj[rootKey];

    const deviceKey = Object.keys(payload).find(key => key.includes('device') && !key.includes('header'));

    if (!deviceKey) {
      return Response.json({ error: 'Invalid XML structure: missing device list' }, { status: 500 });
    }

    const devicesRaw = payload[deviceKey];
    const deviceList = Array.isArray(devicesRaw) ? devicesRaw : [devicesRaw];

    const cams: CamData[] = [];

    const findKey = (obj: any, partial: string) => obj ? Object.keys(obj).find((k: string) => k.includes(partial)) : undefined;

    const navigate = (obj: any, paths: string[]) => {
      let current = obj;
      for (const path of paths) {
        const key = findKey(current, path);
        if (!key) return undefined;
        current = current[key];
      }
      return current;
    };

    for (const device of deviceList) {
      const id = device['@_id'];

      const urlKey = findKey(device, 'deviceUrl');
      const imageUrl = urlKey ? device[urlKey] : null;

      if (!id || !imageUrl) continue;

      const pointLocKey = findKey(device, 'pointLocation');
      const pointLocation = pointLocKey ? device[pointLocKey] : {};

      const coords = navigate(pointLocation, ['tpegPointLocation', 'point', 'pointCoordinates']);
      let latitude: number | undefined;
      let longitude: number | undefined;
      if (coords) {
        const latKey = findKey(coords, 'latitude');
        const lonKey = findKey(coords, 'longitude');
        if (latKey) latitude = Number(coords[latKey]);
        if (lonKey) longitude = Number(coords[lonKey]);
      }

      let roadName = 'Unknown Road';
      let roadDest = '';

      const info = navigate(pointLocation, ['supplementaryPositionalDescription', 'roadInformation']);
      if (info) {
        const nameKey = findKey(info, 'roadName');
        const destKey = findKey(info, 'roadDestination');
        if (nameKey) roadName = info[nameKey];
        if (destKey) roadDest = info[destKey];
      }

      let km = '';
      let province = '';

      const data = navigate(pointLocation, ['tpegPointLocation', 'point', 'Extension', 'extendedTpegNonJunctionPoint']);
      if (data) {
        const kmKey = findKey(data, 'kilometerPoint');
        const provKey = findKey(data, 'province');
        if (kmKey) km = data[kmKey];
        if (provKey) province = data[provKey];
      }

      const webcam: CamData = {
        id: String(id),
        imageUrl: String(imageUrl),
        road: String(roadName),
        kilometer: km ? `Pk ${km}${roadDest ? ' - ' + roadDest : ''}` : (roadDest || ''),
        location: province || 'Unknown',
        status: 'active',
        latitude,
        longitude
      };

      cams.push(webcam);
    }

    const filePath = path.join(process.cwd(), 'data', 'webcams.json');
    try {
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      await fs.promises.writeFile(filePath, JSON.stringify(cams, null, 2), 'utf-8');
    } catch (writeError) {
      console.error('Error writing webcams.json:', writeError);
    }

    return Response.json(cams);

  } catch (error) {
    console.error('Error fetching webcams API:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
