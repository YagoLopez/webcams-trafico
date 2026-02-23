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
      const latRaw = navigate(coords, ['latitude']);
      const lonRaw = navigate(coords, ['longitude']);
      const latitude = latRaw !== undefined ? Number(latRaw) : undefined;
      const longitude = lonRaw !== undefined ? Number(lonRaw) : undefined;

      const info = navigate(pointLocation, ['supplementaryPositionalDescription', 'roadInformation']);
      const roadName = navigate(info, ['roadName']) ?? 'Unknown Road';
      const roadDest = navigate(info, ['roadDestination']) ?? '';

      const data = navigate(pointLocation, ['tpegPointLocation', 'point', 'Extension', 'extendedTpegNonJunctionPoint']);
      const km = navigate(data, ['kilometerPoint']) ?? '';
      const province = navigate(data, ['province']) ?? '';

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
    return Response.json(cams);

  } catch (error) {
    console.error('Error fetching webcams API:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
