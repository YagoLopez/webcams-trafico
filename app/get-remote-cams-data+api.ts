import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

// Internal type definition so the route depends entirely on itself
export interface WebcamData {
  id: string;
  imageUrl: string;
  road: string;
  kilometer: string;
  location: string;
  status: 'active' | 'offline';
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

    const webcams: WebcamData[] = [];

    const findKey = (obj: any, partial: string) => obj ? Object.keys(obj).find((k: string) => k.includes(partial)) : undefined;

    for (const device of deviceList) {
      const id = device['@_id'];

      const urlKey = Object.keys(device).find(key => key.includes('deviceUrl'));
      const imageUrl = urlKey ? device[urlKey] : null;

      if (!id || !imageUrl) continue;

      const pointLocKey = Object.keys(device).find(key => key.includes('pointLocation'));
      const pointLocation = pointLocKey ? device[pointLocKey] : {};

      let roadName = 'Unknown Road';
      let roadDest = '';

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

      let km = '';
      let province = '';

      const tpegKey = findKey(pointLocation, 'tpegPointLocation');
      if (tpegKey) {
        const pointKey = findKey(pointLocation[tpegKey], 'point');
        if (pointKey) {
          const point = pointLocation[tpegKey][pointKey];
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
        status: 'active'
      };

      webcams.push(webcam);
    }

    return Response.json(webcams);

  } catch (error) {
    console.error('Error fetching webcams API:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
